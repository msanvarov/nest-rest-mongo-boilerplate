import { UserActionsEnum } from '@starter/api-types';

import { User } from '../users/user.schema';
import { AppAbility } from './casl.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

// Policy Handlers

export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(UserActionsEnum.Delete, User);
  }
}
