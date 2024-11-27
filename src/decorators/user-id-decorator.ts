import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { authorizantionToLoginPayload } from '../utils/converter/base-64-converter'

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers

  if (!authorization) {
    return undefined
  }

  const loginPayload = authorizantionToLoginPayload(authorization)

  return loginPayload?.id
})
