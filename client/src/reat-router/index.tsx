/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Navigate, Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom'
import { type ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { fetchUserRole } from '../fetch/User/getUsersRoleByToken'
import { QrCalendar } from '../components/pageQR/QR-calendar/qr-calendar'
import { QrVisitor, QrVisitorForm } from '../components/pageQR/QR-visitor/qr-visitor'
import { QRLayout } from '../components/pageQR/QR-Layout'
import { Visitors } from '../components/Admin/Admin_Options/Visitors/Visitors'
import { Companies } from '../components/Admin/Admin_Options/Catalogs/Companies/companies'
import { Incidents } from '../components/Admin/Admin_Options/Incidents/incidents'
import { UnitRecord } from '../components/Admin/Admin_Options/UnitRecord/UnitRecord'
import { VisitorEnter } from '../components/operator-layout/visitors-enter/visitor-enter'
import { VisitorExit } from '../components/operator-layout/visitors-exit/visitor-exit'
import { TrailerTypeChecklist } from '../components/Admin/Admin_Options/Checklist/TowChecklist'
import { TradeExit } from '../components/operator-layout/trade-exit/trade-exit'
import { Records } from '../components/operator-layout/records/Records'
import { VisitorsTable } from '../components/operator-layout/visitorsTable/visitorsTable'
import { Auth } from '../components/Auth/auth'
import { Login } from '../components/Auth/login/Login'
import { OperatorLayout } from '../components/operator-layout/operator-layout'
import { TradeEnter } from '../components/operator-layout/trade-enter/trade-enter'
import { OperatorIncident } from '../components/operator-layout/operator-incident/operator-incident'
import { QrGenerator } from '../components/operator-layout/qr-generator/qr-generator'
import { Admin } from '../components/Admin/Admin'
import { Users } from '../components/Admin/Admin_Options/Users/Users'
import { Locations } from '../components/Admin/Admin_Options/Catalogs/Locations/Locations'
import { Home } from '../components/Admin/Admin_Options/Home/Home'
import { VehicleTypeChecklist } from '../components/Admin/Admin_Options/Checklist/VehicleChecklist'
import { QrGeneratorAdm } from '../components/Admin/Admin_Options/Qr-generatorAdm/qr-generatorAdm'
// import { LoginQR } from '../components/Auth/loginQR/'
import VisitorType from '../components/Admin/Admin_Options/Catalogs/Visitor-types/Visitor-type'
import { TableIncidentsInOperator } from '../components/operator-layout/IncidentsTable/incidents'
import { NotPermissions } from './errors/NotPermissions/NotPermissions'
import { NotSessionStarted } from './errors/NotSessionStarted/NotSessionStarted'
import { ErrorPage } from './errors/error-page'

function ProtectedRoute({ children, allowedRoles }: { children: ReactNode, allowedRoles: Array<string> }) {
  const [userRole, setUserRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionError, setSessionError] = useState(false)
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    async function obtenerRolDeUsuario() {
      try {
        setIsLoading(true)
        await fetchUserRole()
          .then((data) => {
            console.log('1.30MyData:', data.data.user.Role.name)
            setUserRole(data.data.user.Role.name)
            setIsLoading(false)
          })
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error)
      }
    }
    obtenerRolDeUsuario()
  }, [])
  console.log('1.23userRole:', userRole)
  console.log('1.23token:', token)
  if (token?.length === 0) {
    return <NotSessionStarted />
  } else {
    if (allowedRoles.includes(userRole) && localStorage.getItem('authToken') !== '')
      return <>{children}</>
    else if (userRole === 'admin')
      return <NotPermissions role="operator" />
    else if (userRole === 'user')
      return <NotPermissions role="admin" />
    // else
    //   return <NotSessionStarted />// Maneja otros roles según sea necesario
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth" replace />,
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          // {
          //   path: 'demo',
          //   index: true,
          //   element: <DemoRegist />,
          // },
        ],
      },
      {
        path: 'operator',
        element: <ProtectedRoute allowedRoles={['user']}><OperatorLayout /></ProtectedRoute>,
        children: [
          {
            path: 'visitor-enter',
            element: <VisitorEnter />,
          },
          {
            path: 'visitor-exit',
            element: <VisitorExit />,
          },
          {
            path: 'trade-enter',
            element: <TradeEnter />,
          },
          {
            path: 'trade-exit',
            element: <TradeExit />,
          },
          {
            path: 'incidents',
            element: <OperatorIncident />,
          },
          {
            path: 'records',
            element: <Records />,
          },
          //     {
          //       path: 'qr-generator',
          //       element: <QrGenerator />,
          //     },
          {
            path: 'visitor-table',
            element: <VisitorsTable />,
          },
          {
            path: 'incidentsTable',
            element: <TableIncidentsInOperator />,
          },
        ],
      },
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>,
        children: [
          {
            path: 'inicio',
            element: <Home />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'inputRecords',
            element: <UnitRecord />,
          },
          {
            path: 'vehicleChecklist',
            element: <VehicleTypeChecklist />,
          },
          {
            path: 'trailerChecklist',
            element: <TrailerTypeChecklist />,
          },
          {
            path: 'incidents',
            element: <Incidents />,
          },
          {
            path: 'companies',
            element: <Companies />,
          },
          {
            path: 'visitors',
            element: <Visitors />,
          },
          // {
          //   path: 'qrGeneratorAdm',
          //   element: <QrGeneratorAdm />,
          // },
          {
            path: 'visitorType',
            element: <VisitorType />,
          },
          {
            path: 'locations',
            element: <Locations />,
          },
        ],
      },
      // {
      //   path: 'QR',
      //   element: <Outlet />,
      //   errorElement: <ErrorPage />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Navigate to="page-QR" replace />,
      //     },
      //     {
      //       path: 'page-QR',
      //       element: <Auth />,
      //       children: [
      //         // {
      //         //   index: true,
      //         //   element: <LoginQR />,
      //         // },
      //         {
      //           path: 'QRLayout',
      //           element: <QRLayout />,
      //           children: [
      //             {
      //               path: 'qr-visitor',
      //               element: <QrVisitorForm />,
      //             },
      //             {
      //               path: 'qr-calendar',
      //               element: <QrCalendar />,
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
])

export function ReactRouter() {
  return (
    <RouterProvider router={router} />
  )
}
