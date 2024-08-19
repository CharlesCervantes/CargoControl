import fs from 'fs'
import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../env'
import type { Readable, Writable } from 'stream'
import type { PutObjectCommandOutput } from '@aws-sdk/client-s3'

const client = new S3Client({
  region: env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: env.AWS_PUBLIC_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
})

interface UploadedFileInfo {
  ETag: string
  ServerSideEncryption: string | undefined
  // ... otros campos que desees capturar
}

async function pipeStream(source: Readable, destination: Writable): Promise<void> {
  return new Promise((resolve, reject) => {
    source.pipe(destination)
    source.on('end', () => resolve())
    source.on('error', err => reject(err))
  })
}

export async function uploadFile(filePath: string, filename: string): Promise<UploadedFileInfo> {
  const stream = fs.createReadStream(filePath)
  const uploadParams = {
    Bucket: env.AWS_BUCKET_NAME,
    Key: filename,
    Body: stream,
  }
  const command = new PutObjectCommand(uploadParams)

  try {
    const result: PutObjectCommandOutput = await client.send(command)
    // console.log('File uploaded successfully:', result)

    // Capturar información relevante del archivo cargado
    const fileInfo: UploadedFileInfo = {
      ETag: result.ETag || '',
      ServerSideEncryption: result.ServerSideEncryption || undefined,
      // ... otros campos que desees capturar del resultado
    }

    return fileInfo
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export async function listFiles() {
  const command = new ListObjectsCommand({
    Bucket: env.AWS_BUCKET_NAME,
  })

  const result = await client.send(command)

  return result
}

export async function getFile(filename: string) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: filename,
  })

  const result = await client.send(command)
  return result
}

export async function downloadFile(filename: string) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: filename,
  })

  try {
    const result = await client.send(command)

    const fileStream = fs.createWriteStream(`./public/${filename}`)

    await pipeStream(result.Body as Readable, fileStream)

    console.log('File download sucessfully')
  } catch (error) {
    console.error('Error dowloading file: ', error)
    throw error
  }
}

export async function getFileURL(filename: string) {
  const command = new GetObjectCommand({ Bucket: env.AWS_BUCKET_NAME, Key: filename })

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 7200 })
    return url
  } catch (error) {
    console.error('Error generating signed URL:', error)
    throw error
  }
}
