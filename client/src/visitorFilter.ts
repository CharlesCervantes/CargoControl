// src/visitorFilter.ts

import type { IVisitor } from './interfaces'

export const filterAndTransformVisitors = (
  visitors: Array<IVisitor>,
  organizationId: string,
  status: boolean,
) => {
  return visitors
    .filter(visitor => visitor.organizationId === organizationId && visitor.isExit === status)
    .map(visitor => ({
      id: visitor.id,
      name: visitor.Person?.name,
      lastname: visitor.Person?.lastname,
      organization: visitor.Organization?.name,
      visitorType: visitor.VisitorType?.name,
      status: visitor.isExit,
    }))
}
