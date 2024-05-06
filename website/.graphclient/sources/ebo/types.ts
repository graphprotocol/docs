// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace EboTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type ChangePermissionsMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
  address: Scalars['String'];
  oldPermissions: Array<Scalars['String']>;
  newPermissions: Array<Scalars['String']>;
};

export type ChangePermissionsMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  oldPermissions?: InputMaybe<Array<Scalars['String']>>;
  oldPermissions_not?: InputMaybe<Array<Scalars['String']>>;
  oldPermissions_contains?: InputMaybe<Array<Scalars['String']>>;
  oldPermissions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  oldPermissions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  oldPermissions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  newPermissions?: InputMaybe<Array<Scalars['String']>>;
  newPermissions_not?: InputMaybe<Array<Scalars['String']>>;
  newPermissions_contains?: InputMaybe<Array<Scalars['String']>>;
  newPermissions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  newPermissions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  newPermissions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ChangePermissionsMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ChangePermissionsMessage_filter>>>;
};

export type ChangePermissionsMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data'
  | 'address'
  | 'oldPermissions'
  | 'newPermissions';

export type CorrectEpochsMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
};

export type CorrectEpochsMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CorrectEpochsMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CorrectEpochsMessage_filter>>>;
};

export type CorrectEpochsMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data';

export type Epoch = {
  id: Scalars['ID'];
  epochNumber: Scalars['BigInt'];
  blockNumbers: Array<NetworkEpochBlockNumber>;
};


export type EpochblockNumbersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NetworkEpochBlockNumber_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NetworkEpochBlockNumber_filter>;
};

export type Epoch_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  epochNumber?: InputMaybe<Scalars['BigInt']>;
  epochNumber_not?: InputMaybe<Scalars['BigInt']>;
  epochNumber_gt?: InputMaybe<Scalars['BigInt']>;
  epochNumber_lt?: InputMaybe<Scalars['BigInt']>;
  epochNumber_gte?: InputMaybe<Scalars['BigInt']>;
  epochNumber_lte?: InputMaybe<Scalars['BigInt']>;
  epochNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epochNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumbers_?: InputMaybe<NetworkEpochBlockNumber_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Epoch_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Epoch_filter>>>;
};

export type Epoch_orderBy =
  | 'id'
  | 'epochNumber'
  | 'blockNumbers';

export type GlobalState = {
  id: Scalars['ID'];
  networkCount: Scalars['Int'];
  activeNetworkCount: Scalars['Int'];
  networkArrayHead?: Maybe<Network>;
  latestValidEpoch?: Maybe<Epoch>;
  networks: Array<Network>;
  encodingVersion: Scalars['Int'];
  permissionList: Array<PermissionListEntry>;
};


export type GlobalStatenetworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Network_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Network_filter>;
};


export type GlobalStatepermissionListArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionListEntry_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PermissionListEntry_filter>;
};

export type GlobalState_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  networkCount?: InputMaybe<Scalars['Int']>;
  networkCount_not?: InputMaybe<Scalars['Int']>;
  networkCount_gt?: InputMaybe<Scalars['Int']>;
  networkCount_lt?: InputMaybe<Scalars['Int']>;
  networkCount_gte?: InputMaybe<Scalars['Int']>;
  networkCount_lte?: InputMaybe<Scalars['Int']>;
  networkCount_in?: InputMaybe<Array<Scalars['Int']>>;
  networkCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  activeNetworkCount?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_not?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_gt?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_lt?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_gte?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_lte?: InputMaybe<Scalars['Int']>;
  activeNetworkCount_in?: InputMaybe<Array<Scalars['Int']>>;
  activeNetworkCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  networkArrayHead?: InputMaybe<Scalars['String']>;
  networkArrayHead_not?: InputMaybe<Scalars['String']>;
  networkArrayHead_gt?: InputMaybe<Scalars['String']>;
  networkArrayHead_lt?: InputMaybe<Scalars['String']>;
  networkArrayHead_gte?: InputMaybe<Scalars['String']>;
  networkArrayHead_lte?: InputMaybe<Scalars['String']>;
  networkArrayHead_in?: InputMaybe<Array<Scalars['String']>>;
  networkArrayHead_not_in?: InputMaybe<Array<Scalars['String']>>;
  networkArrayHead_contains?: InputMaybe<Scalars['String']>;
  networkArrayHead_contains_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_contains?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_contains_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_starts_with?: InputMaybe<Scalars['String']>;
  networkArrayHead_starts_with_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_starts_with?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_ends_with?: InputMaybe<Scalars['String']>;
  networkArrayHead_ends_with_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_ends_with?: InputMaybe<Scalars['String']>;
  networkArrayHead_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  networkArrayHead_?: InputMaybe<Network_filter>;
  latestValidEpoch?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not?: InputMaybe<Scalars['String']>;
  latestValidEpoch_gt?: InputMaybe<Scalars['String']>;
  latestValidEpoch_lt?: InputMaybe<Scalars['String']>;
  latestValidEpoch_gte?: InputMaybe<Scalars['String']>;
  latestValidEpoch_lte?: InputMaybe<Scalars['String']>;
  latestValidEpoch_in?: InputMaybe<Array<Scalars['String']>>;
  latestValidEpoch_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestValidEpoch_contains?: InputMaybe<Scalars['String']>;
  latestValidEpoch_contains_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_contains?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_contains_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_starts_with?: InputMaybe<Scalars['String']>;
  latestValidEpoch_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_starts_with?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_ends_with?: InputMaybe<Scalars['String']>;
  latestValidEpoch_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_ends_with?: InputMaybe<Scalars['String']>;
  latestValidEpoch_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidEpoch_?: InputMaybe<Epoch_filter>;
  networks_?: InputMaybe<Network_filter>;
  encodingVersion?: InputMaybe<Scalars['Int']>;
  encodingVersion_not?: InputMaybe<Scalars['Int']>;
  encodingVersion_gt?: InputMaybe<Scalars['Int']>;
  encodingVersion_lt?: InputMaybe<Scalars['Int']>;
  encodingVersion_gte?: InputMaybe<Scalars['Int']>;
  encodingVersion_lte?: InputMaybe<Scalars['Int']>;
  encodingVersion_in?: InputMaybe<Array<Scalars['Int']>>;
  encodingVersion_not_in?: InputMaybe<Array<Scalars['Int']>>;
  permissionList?: InputMaybe<Array<Scalars['String']>>;
  permissionList_not?: InputMaybe<Array<Scalars['String']>>;
  permissionList_contains?: InputMaybe<Array<Scalars['String']>>;
  permissionList_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  permissionList_not_contains?: InputMaybe<Array<Scalars['String']>>;
  permissionList_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  permissionList_?: InputMaybe<PermissionListEntry_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GlobalState_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GlobalState_filter>>>;
};

export type GlobalState_orderBy =
  | 'id'
  | 'networkCount'
  | 'activeNetworkCount'
  | 'networkArrayHead'
  | 'networkArrayHead__id'
  | 'networkArrayHead__arrayIndex'
  | 'latestValidEpoch'
  | 'latestValidEpoch__id'
  | 'latestValidEpoch__epochNumber'
  | 'networks'
  | 'encodingVersion'
  | 'permissionList';

export type Message = {
  id: Scalars['ID'];
  block: MessageBlock;
  /** data is optional since it might be an empty message */
  data?: Maybe<Scalars['Bytes']>;
};

export type MessageBlock = {
  id: Scalars['ID'];
  data: Scalars['Bytes'];
  payload: Payload;
  messages: Array<Message>;
};


export type MessageBlockmessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Message_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Message_filter>;
};

export type MessageBlock_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  payload?: InputMaybe<Scalars['String']>;
  payload_not?: InputMaybe<Scalars['String']>;
  payload_gt?: InputMaybe<Scalars['String']>;
  payload_lt?: InputMaybe<Scalars['String']>;
  payload_gte?: InputMaybe<Scalars['String']>;
  payload_lte?: InputMaybe<Scalars['String']>;
  payload_in?: InputMaybe<Array<Scalars['String']>>;
  payload_not_in?: InputMaybe<Array<Scalars['String']>>;
  payload_contains?: InputMaybe<Scalars['String']>;
  payload_contains_nocase?: InputMaybe<Scalars['String']>;
  payload_not_contains?: InputMaybe<Scalars['String']>;
  payload_not_contains_nocase?: InputMaybe<Scalars['String']>;
  payload_starts_with?: InputMaybe<Scalars['String']>;
  payload_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payload_not_starts_with?: InputMaybe<Scalars['String']>;
  payload_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  payload_ends_with?: InputMaybe<Scalars['String']>;
  payload_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payload_not_ends_with?: InputMaybe<Scalars['String']>;
  payload_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  payload_?: InputMaybe<Payload_filter>;
  messages_?: InputMaybe<Message_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MessageBlock_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MessageBlock_filter>>>;
};

export type MessageBlock_orderBy =
  | 'id'
  | 'data'
  | 'payload'
  | 'payload__id'
  | 'payload__data'
  | 'payload__submitter'
  | 'payload__valid'
  | 'payload__createdAt'
  | 'payload__errorMessage'
  | 'messages';

export type Message_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Message_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Message_filter>>>;
};

export type Message_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data';

export type Network = {
  id: Scalars['ID'];
  addedAt: Message;
  lastUpdatedAt: Message;
  removedAt?: Maybe<Message>;
  blockNumbers: Array<NetworkEpochBlockNumber>;
  /** Next element on the linked-list implementation for networks. Used for list recreation */
  nextArrayElement?: Maybe<Network>;
  /** Index number on the linked list */
  arrayIndex?: Maybe<Scalars['Int']>;
  state?: Maybe<GlobalState>;
  latestValidBlockNumber?: Maybe<NetworkEpochBlockNumber>;
};


export type NetworkblockNumbersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NetworkEpochBlockNumber_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NetworkEpochBlockNumber_filter>;
};

export type NetworkEpochBlockNumber = {
  id: Scalars['ID'];
  acceleration: Scalars['BigInt'];
  delta: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  epochNumber: Scalars['BigInt'];
  network: Network;
  epoch: Epoch;
  /** Entity used for calculations. Null if it's the first */
  previousBlockNumber?: Maybe<NetworkEpochBlockNumber>;
};

export type NetworkEpochBlockNumber_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  acceleration?: InputMaybe<Scalars['BigInt']>;
  acceleration_not?: InputMaybe<Scalars['BigInt']>;
  acceleration_gt?: InputMaybe<Scalars['BigInt']>;
  acceleration_lt?: InputMaybe<Scalars['BigInt']>;
  acceleration_gte?: InputMaybe<Scalars['BigInt']>;
  acceleration_lte?: InputMaybe<Scalars['BigInt']>;
  acceleration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  acceleration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delta?: InputMaybe<Scalars['BigInt']>;
  delta_not?: InputMaybe<Scalars['BigInt']>;
  delta_gt?: InputMaybe<Scalars['BigInt']>;
  delta_lt?: InputMaybe<Scalars['BigInt']>;
  delta_gte?: InputMaybe<Scalars['BigInt']>;
  delta_lte?: InputMaybe<Scalars['BigInt']>;
  delta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  delta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epochNumber?: InputMaybe<Scalars['BigInt']>;
  epochNumber_not?: InputMaybe<Scalars['BigInt']>;
  epochNumber_gt?: InputMaybe<Scalars['BigInt']>;
  epochNumber_lt?: InputMaybe<Scalars['BigInt']>;
  epochNumber_gte?: InputMaybe<Scalars['BigInt']>;
  epochNumber_lte?: InputMaybe<Scalars['BigInt']>;
  epochNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  epochNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  network?: InputMaybe<Scalars['String']>;
  network_not?: InputMaybe<Scalars['String']>;
  network_gt?: InputMaybe<Scalars['String']>;
  network_lt?: InputMaybe<Scalars['String']>;
  network_gte?: InputMaybe<Scalars['String']>;
  network_lte?: InputMaybe<Scalars['String']>;
  network_in?: InputMaybe<Array<Scalars['String']>>;
  network_not_in?: InputMaybe<Array<Scalars['String']>>;
  network_contains?: InputMaybe<Scalars['String']>;
  network_contains_nocase?: InputMaybe<Scalars['String']>;
  network_not_contains?: InputMaybe<Scalars['String']>;
  network_not_contains_nocase?: InputMaybe<Scalars['String']>;
  network_starts_with?: InputMaybe<Scalars['String']>;
  network_starts_with_nocase?: InputMaybe<Scalars['String']>;
  network_not_starts_with?: InputMaybe<Scalars['String']>;
  network_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  network_ends_with?: InputMaybe<Scalars['String']>;
  network_ends_with_nocase?: InputMaybe<Scalars['String']>;
  network_not_ends_with?: InputMaybe<Scalars['String']>;
  network_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  network_?: InputMaybe<Network_filter>;
  epoch?: InputMaybe<Scalars['String']>;
  epoch_not?: InputMaybe<Scalars['String']>;
  epoch_gt?: InputMaybe<Scalars['String']>;
  epoch_lt?: InputMaybe<Scalars['String']>;
  epoch_gte?: InputMaybe<Scalars['String']>;
  epoch_lte?: InputMaybe<Scalars['String']>;
  epoch_in?: InputMaybe<Array<Scalars['String']>>;
  epoch_not_in?: InputMaybe<Array<Scalars['String']>>;
  epoch_contains?: InputMaybe<Scalars['String']>;
  epoch_contains_nocase?: InputMaybe<Scalars['String']>;
  epoch_not_contains?: InputMaybe<Scalars['String']>;
  epoch_not_contains_nocase?: InputMaybe<Scalars['String']>;
  epoch_starts_with?: InputMaybe<Scalars['String']>;
  epoch_starts_with_nocase?: InputMaybe<Scalars['String']>;
  epoch_not_starts_with?: InputMaybe<Scalars['String']>;
  epoch_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  epoch_ends_with?: InputMaybe<Scalars['String']>;
  epoch_ends_with_nocase?: InputMaybe<Scalars['String']>;
  epoch_not_ends_with?: InputMaybe<Scalars['String']>;
  epoch_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  epoch_?: InputMaybe<Epoch_filter>;
  previousBlockNumber?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not?: InputMaybe<Scalars['String']>;
  previousBlockNumber_gt?: InputMaybe<Scalars['String']>;
  previousBlockNumber_lt?: InputMaybe<Scalars['String']>;
  previousBlockNumber_gte?: InputMaybe<Scalars['String']>;
  previousBlockNumber_lte?: InputMaybe<Scalars['String']>;
  previousBlockNumber_in?: InputMaybe<Array<Scalars['String']>>;
  previousBlockNumber_not_in?: InputMaybe<Array<Scalars['String']>>;
  previousBlockNumber_contains?: InputMaybe<Scalars['String']>;
  previousBlockNumber_contains_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_contains?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_contains_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_starts_with?: InputMaybe<Scalars['String']>;
  previousBlockNumber_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_ends_with?: InputMaybe<Scalars['String']>;
  previousBlockNumber_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  previousBlockNumber_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  previousBlockNumber_?: InputMaybe<NetworkEpochBlockNumber_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NetworkEpochBlockNumber_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NetworkEpochBlockNumber_filter>>>;
};

export type NetworkEpochBlockNumber_orderBy =
  | 'id'
  | 'acceleration'
  | 'delta'
  | 'blockNumber'
  | 'epochNumber'
  | 'network'
  | 'network__id'
  | 'network__arrayIndex'
  | 'epoch'
  | 'epoch__id'
  | 'epoch__epochNumber'
  | 'previousBlockNumber'
  | 'previousBlockNumber__id'
  | 'previousBlockNumber__acceleration'
  | 'previousBlockNumber__delta'
  | 'previousBlockNumber__blockNumber'
  | 'previousBlockNumber__epochNumber';

export type Network_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  addedAt?: InputMaybe<Scalars['String']>;
  addedAt_not?: InputMaybe<Scalars['String']>;
  addedAt_gt?: InputMaybe<Scalars['String']>;
  addedAt_lt?: InputMaybe<Scalars['String']>;
  addedAt_gte?: InputMaybe<Scalars['String']>;
  addedAt_lte?: InputMaybe<Scalars['String']>;
  addedAt_in?: InputMaybe<Array<Scalars['String']>>;
  addedAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  addedAt_contains?: InputMaybe<Scalars['String']>;
  addedAt_contains_nocase?: InputMaybe<Scalars['String']>;
  addedAt_not_contains?: InputMaybe<Scalars['String']>;
  addedAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  addedAt_starts_with?: InputMaybe<Scalars['String']>;
  addedAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addedAt_not_starts_with?: InputMaybe<Scalars['String']>;
  addedAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addedAt_ends_with?: InputMaybe<Scalars['String']>;
  addedAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addedAt_not_ends_with?: InputMaybe<Scalars['String']>;
  addedAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addedAt_?: InputMaybe<Message_filter>;
  lastUpdatedAt?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_gt?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_lt?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_gte?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_lte?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_in?: InputMaybe<Array<Scalars['String']>>;
  lastUpdatedAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastUpdatedAt_contains?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_contains_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_contains?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_starts_with?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_starts_with?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_ends_with?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_ends_with?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastUpdatedAt_?: InputMaybe<Message_filter>;
  removedAt?: InputMaybe<Scalars['String']>;
  removedAt_not?: InputMaybe<Scalars['String']>;
  removedAt_gt?: InputMaybe<Scalars['String']>;
  removedAt_lt?: InputMaybe<Scalars['String']>;
  removedAt_gte?: InputMaybe<Scalars['String']>;
  removedAt_lte?: InputMaybe<Scalars['String']>;
  removedAt_in?: InputMaybe<Array<Scalars['String']>>;
  removedAt_not_in?: InputMaybe<Array<Scalars['String']>>;
  removedAt_contains?: InputMaybe<Scalars['String']>;
  removedAt_contains_nocase?: InputMaybe<Scalars['String']>;
  removedAt_not_contains?: InputMaybe<Scalars['String']>;
  removedAt_not_contains_nocase?: InputMaybe<Scalars['String']>;
  removedAt_starts_with?: InputMaybe<Scalars['String']>;
  removedAt_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removedAt_not_starts_with?: InputMaybe<Scalars['String']>;
  removedAt_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  removedAt_ends_with?: InputMaybe<Scalars['String']>;
  removedAt_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removedAt_not_ends_with?: InputMaybe<Scalars['String']>;
  removedAt_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  removedAt_?: InputMaybe<Message_filter>;
  blockNumbers_?: InputMaybe<NetworkEpochBlockNumber_filter>;
  nextArrayElement?: InputMaybe<Scalars['String']>;
  nextArrayElement_not?: InputMaybe<Scalars['String']>;
  nextArrayElement_gt?: InputMaybe<Scalars['String']>;
  nextArrayElement_lt?: InputMaybe<Scalars['String']>;
  nextArrayElement_gte?: InputMaybe<Scalars['String']>;
  nextArrayElement_lte?: InputMaybe<Scalars['String']>;
  nextArrayElement_in?: InputMaybe<Array<Scalars['String']>>;
  nextArrayElement_not_in?: InputMaybe<Array<Scalars['String']>>;
  nextArrayElement_contains?: InputMaybe<Scalars['String']>;
  nextArrayElement_contains_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_contains?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_starts_with?: InputMaybe<Scalars['String']>;
  nextArrayElement_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_starts_with?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_ends_with?: InputMaybe<Scalars['String']>;
  nextArrayElement_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_ends_with?: InputMaybe<Scalars['String']>;
  nextArrayElement_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nextArrayElement_?: InputMaybe<Network_filter>;
  arrayIndex?: InputMaybe<Scalars['Int']>;
  arrayIndex_not?: InputMaybe<Scalars['Int']>;
  arrayIndex_gt?: InputMaybe<Scalars['Int']>;
  arrayIndex_lt?: InputMaybe<Scalars['Int']>;
  arrayIndex_gte?: InputMaybe<Scalars['Int']>;
  arrayIndex_lte?: InputMaybe<Scalars['Int']>;
  arrayIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  arrayIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  state?: InputMaybe<Scalars['String']>;
  state_not?: InputMaybe<Scalars['String']>;
  state_gt?: InputMaybe<Scalars['String']>;
  state_lt?: InputMaybe<Scalars['String']>;
  state_gte?: InputMaybe<Scalars['String']>;
  state_lte?: InputMaybe<Scalars['String']>;
  state_in?: InputMaybe<Array<Scalars['String']>>;
  state_not_in?: InputMaybe<Array<Scalars['String']>>;
  state_contains?: InputMaybe<Scalars['String']>;
  state_contains_nocase?: InputMaybe<Scalars['String']>;
  state_not_contains?: InputMaybe<Scalars['String']>;
  state_not_contains_nocase?: InputMaybe<Scalars['String']>;
  state_starts_with?: InputMaybe<Scalars['String']>;
  state_starts_with_nocase?: InputMaybe<Scalars['String']>;
  state_not_starts_with?: InputMaybe<Scalars['String']>;
  state_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  state_ends_with?: InputMaybe<Scalars['String']>;
  state_ends_with_nocase?: InputMaybe<Scalars['String']>;
  state_not_ends_with?: InputMaybe<Scalars['String']>;
  state_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  state_?: InputMaybe<GlobalState_filter>;
  latestValidBlockNumber?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_gt?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_lt?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_gte?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_lte?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_in?: InputMaybe<Array<Scalars['String']>>;
  latestValidBlockNumber_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestValidBlockNumber_contains?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_contains_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_contains?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_contains_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_starts_with?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_ends_with?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestValidBlockNumber_?: InputMaybe<NetworkEpochBlockNumber_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Network_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Network_filter>>>;
};

export type Network_orderBy =
  | 'id'
  | 'addedAt'
  | 'addedAt__id'
  | 'addedAt__data'
  | 'lastUpdatedAt'
  | 'lastUpdatedAt__id'
  | 'lastUpdatedAt__data'
  | 'removedAt'
  | 'removedAt__id'
  | 'removedAt__data'
  | 'blockNumbers'
  | 'nextArrayElement'
  | 'nextArrayElement__id'
  | 'nextArrayElement__arrayIndex'
  | 'arrayIndex'
  | 'state'
  | 'state__id'
  | 'state__networkCount'
  | 'state__activeNetworkCount'
  | 'state__encodingVersion'
  | 'latestValidBlockNumber'
  | 'latestValidBlockNumber__id'
  | 'latestValidBlockNumber__acceleration'
  | 'latestValidBlockNumber__delta'
  | 'latestValidBlockNumber__blockNumber'
  | 'latestValidBlockNumber__epochNumber';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Payload = {
  id: Scalars['ID'];
  data: Scalars['Bytes'];
  submitter: Scalars['String'];
  valid: Scalars['Boolean'];
  /** Block number where this payload was created at */
  createdAt: Scalars['BigInt'];
  /** Optional error message in case the payload is invalid. Useful for debugging purposes */
  errorMessage?: Maybe<Scalars['String']>;
  messageBlocks: Array<MessageBlock>;
};


export type PayloadmessageBlocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MessageBlock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MessageBlock_filter>;
};

export type Payload_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  submitter?: InputMaybe<Scalars['String']>;
  submitter_not?: InputMaybe<Scalars['String']>;
  submitter_gt?: InputMaybe<Scalars['String']>;
  submitter_lt?: InputMaybe<Scalars['String']>;
  submitter_gte?: InputMaybe<Scalars['String']>;
  submitter_lte?: InputMaybe<Scalars['String']>;
  submitter_in?: InputMaybe<Array<Scalars['String']>>;
  submitter_not_in?: InputMaybe<Array<Scalars['String']>>;
  submitter_contains?: InputMaybe<Scalars['String']>;
  submitter_contains_nocase?: InputMaybe<Scalars['String']>;
  submitter_not_contains?: InputMaybe<Scalars['String']>;
  submitter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  submitter_starts_with?: InputMaybe<Scalars['String']>;
  submitter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  submitter_not_starts_with?: InputMaybe<Scalars['String']>;
  submitter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  submitter_ends_with?: InputMaybe<Scalars['String']>;
  submitter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  submitter_not_ends_with?: InputMaybe<Scalars['String']>;
  submitter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  valid?: InputMaybe<Scalars['Boolean']>;
  valid_not?: InputMaybe<Scalars['Boolean']>;
  valid_in?: InputMaybe<Array<Scalars['Boolean']>>;
  valid_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  errorMessage?: InputMaybe<Scalars['String']>;
  errorMessage_not?: InputMaybe<Scalars['String']>;
  errorMessage_gt?: InputMaybe<Scalars['String']>;
  errorMessage_lt?: InputMaybe<Scalars['String']>;
  errorMessage_gte?: InputMaybe<Scalars['String']>;
  errorMessage_lte?: InputMaybe<Scalars['String']>;
  errorMessage_in?: InputMaybe<Array<Scalars['String']>>;
  errorMessage_not_in?: InputMaybe<Array<Scalars['String']>>;
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  errorMessage_contains_nocase?: InputMaybe<Scalars['String']>;
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  errorMessage_not_contains_nocase?: InputMaybe<Scalars['String']>;
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage_starts_with_nocase?: InputMaybe<Scalars['String']>;
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  errorMessage_ends_with_nocase?: InputMaybe<Scalars['String']>;
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  errorMessage_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  messageBlocks_?: InputMaybe<MessageBlock_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Payload_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Payload_filter>>>;
};

export type Payload_orderBy =
  | 'id'
  | 'data'
  | 'submitter'
  | 'valid'
  | 'createdAt'
  | 'errorMessage'
  | 'messageBlocks';

export type PermissionListEntry = {
  id: Scalars['ID'];
  permissions: Array<Scalars['String']>;
  validThrough: Scalars['BigInt'];
};

export type PermissionListEntry_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  permissions?: InputMaybe<Array<Scalars['String']>>;
  permissions_not?: InputMaybe<Array<Scalars['String']>>;
  permissions_contains?: InputMaybe<Array<Scalars['String']>>;
  permissions_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  permissions_not_contains?: InputMaybe<Array<Scalars['String']>>;
  permissions_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  validThrough?: InputMaybe<Scalars['BigInt']>;
  validThrough_not?: InputMaybe<Scalars['BigInt']>;
  validThrough_gt?: InputMaybe<Scalars['BigInt']>;
  validThrough_lt?: InputMaybe<Scalars['BigInt']>;
  validThrough_gte?: InputMaybe<Scalars['BigInt']>;
  validThrough_lte?: InputMaybe<Scalars['BigInt']>;
  validThrough_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validThrough_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PermissionListEntry_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PermissionListEntry_filter>>>;
};

export type PermissionListEntry_orderBy =
  | 'id'
  | 'permissions'
  | 'validThrough';

export type Query = {
  payload?: Maybe<Payload>;
  payloads: Array<Payload>;
  messageBlock?: Maybe<MessageBlock>;
  messageBlocks: Array<MessageBlock>;
  setBlockNumbersForEpochMessage?: Maybe<SetBlockNumbersForEpochMessage>;
  setBlockNumbersForEpochMessages: Array<SetBlockNumbersForEpochMessage>;
  correctEpochsMessage?: Maybe<CorrectEpochsMessage>;
  correctEpochsMessages: Array<CorrectEpochsMessage>;
  updateVersionsMessage?: Maybe<UpdateVersionsMessage>;
  updateVersionsMessages: Array<UpdateVersionsMessage>;
  changePermissionsMessage?: Maybe<ChangePermissionsMessage>;
  changePermissionsMessages: Array<ChangePermissionsMessage>;
  resetStateMessage?: Maybe<ResetStateMessage>;
  resetStateMessages: Array<ResetStateMessage>;
  registerNetworksMessage?: Maybe<RegisterNetworksMessage>;
  registerNetworksMessages: Array<RegisterNetworksMessage>;
  network?: Maybe<Network>;
  networks: Array<Network>;
  globalState?: Maybe<GlobalState>;
  globalStates: Array<GlobalState>;
  permissionListEntry?: Maybe<PermissionListEntry>;
  permissionListEntries: Array<PermissionListEntry>;
  epoch?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  networkEpochBlockNumber?: Maybe<NetworkEpochBlockNumber>;
  networkEpochBlockNumbers: Array<NetworkEpochBlockNumber>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerypayloadArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypayloadsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payload_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Payload_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymessageBlockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymessageBlocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MessageBlock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MessageBlock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetBlockNumbersForEpochMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetBlockNumbersForEpochMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetBlockNumbersForEpochMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetBlockNumbersForEpochMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycorrectEpochsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycorrectEpochsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CorrectEpochsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CorrectEpochsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateVersionsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateVersionsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateVersionsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateVersionsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychangePermissionsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerychangePermissionsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChangePermissionsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChangePermissionsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryresetStateMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryresetStateMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ResetStateMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ResetStateMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryregisterNetworksMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryregisterNetworksMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisterNetworksMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RegisterNetworksMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynetworkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynetworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Network_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Network_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalStateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryglobalStatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GlobalState_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalState_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypermissionListEntryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypermissionListEntriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionListEntry_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PermissionListEntry_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Epoch_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Epoch_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynetworkEpochBlockNumberArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynetworkEpochBlockNumbersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NetworkEpochBlockNumber_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NetworkEpochBlockNumber_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Message_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Message_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RegisterNetworksMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
  removeCount: Scalars['BigInt'];
  addCount: Scalars['BigInt'];
};

export type RegisterNetworksMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  removeCount?: InputMaybe<Scalars['BigInt']>;
  removeCount_not?: InputMaybe<Scalars['BigInt']>;
  removeCount_gt?: InputMaybe<Scalars['BigInt']>;
  removeCount_lt?: InputMaybe<Scalars['BigInt']>;
  removeCount_gte?: InputMaybe<Scalars['BigInt']>;
  removeCount_lte?: InputMaybe<Scalars['BigInt']>;
  removeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addCount?: InputMaybe<Scalars['BigInt']>;
  addCount_not?: InputMaybe<Scalars['BigInt']>;
  addCount_gt?: InputMaybe<Scalars['BigInt']>;
  addCount_lt?: InputMaybe<Scalars['BigInt']>;
  addCount_gte?: InputMaybe<Scalars['BigInt']>;
  addCount_lte?: InputMaybe<Scalars['BigInt']>;
  addCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RegisterNetworksMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RegisterNetworksMessage_filter>>>;
};

export type RegisterNetworksMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data'
  | 'removeCount'
  | 'addCount';

export type ResetStateMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
};

export type ResetStateMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ResetStateMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ResetStateMessage_filter>>>;
};

export type ResetStateMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data';

export type SetBlockNumbersForEpochMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
  merkleRoot?: Maybe<Scalars['Bytes']>;
  accelerations?: Maybe<Array<Scalars['BigInt']>>;
  count?: Maybe<Scalars['BigInt']>;
};

export type SetBlockNumbersForEpochMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  merkleRoot?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_not?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_gt?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_lt?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_gte?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_lte?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_in?: InputMaybe<Array<Scalars['Bytes']>>;
  merkleRoot_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  merkleRoot_contains?: InputMaybe<Scalars['Bytes']>;
  merkleRoot_not_contains?: InputMaybe<Scalars['Bytes']>;
  accelerations?: InputMaybe<Array<Scalars['BigInt']>>;
  accelerations_not?: InputMaybe<Array<Scalars['BigInt']>>;
  accelerations_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  accelerations_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  accelerations_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  accelerations_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  count?: InputMaybe<Scalars['BigInt']>;
  count_not?: InputMaybe<Scalars['BigInt']>;
  count_gt?: InputMaybe<Scalars['BigInt']>;
  count_lt?: InputMaybe<Scalars['BigInt']>;
  count_gte?: InputMaybe<Scalars['BigInt']>;
  count_lte?: InputMaybe<Scalars['BigInt']>;
  count_in?: InputMaybe<Array<Scalars['BigInt']>>;
  count_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SetBlockNumbersForEpochMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SetBlockNumbersForEpochMessage_filter>>>;
};

export type SetBlockNumbersForEpochMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data'
  | 'merkleRoot'
  | 'accelerations'
  | 'count';

export type Subscription = {
  payload?: Maybe<Payload>;
  payloads: Array<Payload>;
  messageBlock?: Maybe<MessageBlock>;
  messageBlocks: Array<MessageBlock>;
  setBlockNumbersForEpochMessage?: Maybe<SetBlockNumbersForEpochMessage>;
  setBlockNumbersForEpochMessages: Array<SetBlockNumbersForEpochMessage>;
  correctEpochsMessage?: Maybe<CorrectEpochsMessage>;
  correctEpochsMessages: Array<CorrectEpochsMessage>;
  updateVersionsMessage?: Maybe<UpdateVersionsMessage>;
  updateVersionsMessages: Array<UpdateVersionsMessage>;
  changePermissionsMessage?: Maybe<ChangePermissionsMessage>;
  changePermissionsMessages: Array<ChangePermissionsMessage>;
  resetStateMessage?: Maybe<ResetStateMessage>;
  resetStateMessages: Array<ResetStateMessage>;
  registerNetworksMessage?: Maybe<RegisterNetworksMessage>;
  registerNetworksMessages: Array<RegisterNetworksMessage>;
  network?: Maybe<Network>;
  networks: Array<Network>;
  globalState?: Maybe<GlobalState>;
  globalStates: Array<GlobalState>;
  permissionListEntry?: Maybe<PermissionListEntry>;
  permissionListEntries: Array<PermissionListEntry>;
  epoch?: Maybe<Epoch>;
  epoches: Array<Epoch>;
  networkEpochBlockNumber?: Maybe<NetworkEpochBlockNumber>;
  networkEpochBlockNumbers: Array<NetworkEpochBlockNumber>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionpayloadArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpayloadsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Payload_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Payload_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmessageBlockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmessageBlocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MessageBlock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MessageBlock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetBlockNumbersForEpochMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetBlockNumbersForEpochMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetBlockNumbersForEpochMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetBlockNumbersForEpochMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncorrectEpochsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncorrectEpochsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CorrectEpochsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CorrectEpochsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateVersionsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateVersionsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateVersionsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateVersionsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchangePermissionsMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionchangePermissionsMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ChangePermissionsMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ChangePermissionsMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionresetStateMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionresetStateMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ResetStateMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ResetStateMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionregisterNetworksMessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionregisterNetworksMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisterNetworksMessage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RegisterNetworksMessage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnetworkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnetworksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Network_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Network_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalStateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionglobalStatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GlobalState_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GlobalState_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpermissionListEntryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpermissionListEntriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PermissionListEntry_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PermissionListEntry_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Epoch_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Epoch_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnetworkEpochBlockNumberArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnetworkEpochBlockNumbersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NetworkEpochBlockNumber_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NetworkEpochBlockNumber_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmessageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Message_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Message_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type UpdateVersionsMessage = Message & {
  id: Scalars['ID'];
  block: MessageBlock;
  data?: Maybe<Scalars['Bytes']>;
  newVersion: Scalars['Int'];
  oldVersion: Scalars['Int'];
};

export type UpdateVersionsMessage_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<MessageBlock_filter>;
  data?: InputMaybe<Scalars['Bytes']>;
  data_not?: InputMaybe<Scalars['Bytes']>;
  data_gt?: InputMaybe<Scalars['Bytes']>;
  data_lt?: InputMaybe<Scalars['Bytes']>;
  data_gte?: InputMaybe<Scalars['Bytes']>;
  data_lte?: InputMaybe<Scalars['Bytes']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  data_contains?: InputMaybe<Scalars['Bytes']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']>;
  newVersion?: InputMaybe<Scalars['Int']>;
  newVersion_not?: InputMaybe<Scalars['Int']>;
  newVersion_gt?: InputMaybe<Scalars['Int']>;
  newVersion_lt?: InputMaybe<Scalars['Int']>;
  newVersion_gte?: InputMaybe<Scalars['Int']>;
  newVersion_lte?: InputMaybe<Scalars['Int']>;
  newVersion_in?: InputMaybe<Array<Scalars['Int']>>;
  newVersion_not_in?: InputMaybe<Array<Scalars['Int']>>;
  oldVersion?: InputMaybe<Scalars['Int']>;
  oldVersion_not?: InputMaybe<Scalars['Int']>;
  oldVersion_gt?: InputMaybe<Scalars['Int']>;
  oldVersion_lt?: InputMaybe<Scalars['Int']>;
  oldVersion_gte?: InputMaybe<Scalars['Int']>;
  oldVersion_lte?: InputMaybe<Scalars['Int']>;
  oldVersion_in?: InputMaybe<Array<Scalars['Int']>>;
  oldVersion_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateVersionsMessage_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateVersionsMessage_filter>>>;
};

export type UpdateVersionsMessage_orderBy =
  | 'id'
  | 'block'
  | 'block__id'
  | 'block__data'
  | 'data'
  | 'newVersion'
  | 'oldVersion';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  payload: InContextSdkMethod<Query['payload'], QuerypayloadArgs, MeshContext>,
  /** null **/
  payloads: InContextSdkMethod<Query['payloads'], QuerypayloadsArgs, MeshContext>,
  /** null **/
  messageBlock: InContextSdkMethod<Query['messageBlock'], QuerymessageBlockArgs, MeshContext>,
  /** null **/
  messageBlocks: InContextSdkMethod<Query['messageBlocks'], QuerymessageBlocksArgs, MeshContext>,
  /** null **/
  setBlockNumbersForEpochMessage: InContextSdkMethod<Query['setBlockNumbersForEpochMessage'], QuerysetBlockNumbersForEpochMessageArgs, MeshContext>,
  /** null **/
  setBlockNumbersForEpochMessages: InContextSdkMethod<Query['setBlockNumbersForEpochMessages'], QuerysetBlockNumbersForEpochMessagesArgs, MeshContext>,
  /** null **/
  correctEpochsMessage: InContextSdkMethod<Query['correctEpochsMessage'], QuerycorrectEpochsMessageArgs, MeshContext>,
  /** null **/
  correctEpochsMessages: InContextSdkMethod<Query['correctEpochsMessages'], QuerycorrectEpochsMessagesArgs, MeshContext>,
  /** null **/
  updateVersionsMessage: InContextSdkMethod<Query['updateVersionsMessage'], QueryupdateVersionsMessageArgs, MeshContext>,
  /** null **/
  updateVersionsMessages: InContextSdkMethod<Query['updateVersionsMessages'], QueryupdateVersionsMessagesArgs, MeshContext>,
  /** null **/
  changePermissionsMessage: InContextSdkMethod<Query['changePermissionsMessage'], QuerychangePermissionsMessageArgs, MeshContext>,
  /** null **/
  changePermissionsMessages: InContextSdkMethod<Query['changePermissionsMessages'], QuerychangePermissionsMessagesArgs, MeshContext>,
  /** null **/
  resetStateMessage: InContextSdkMethod<Query['resetStateMessage'], QueryresetStateMessageArgs, MeshContext>,
  /** null **/
  resetStateMessages: InContextSdkMethod<Query['resetStateMessages'], QueryresetStateMessagesArgs, MeshContext>,
  /** null **/
  registerNetworksMessage: InContextSdkMethod<Query['registerNetworksMessage'], QueryregisterNetworksMessageArgs, MeshContext>,
  /** null **/
  registerNetworksMessages: InContextSdkMethod<Query['registerNetworksMessages'], QueryregisterNetworksMessagesArgs, MeshContext>,
  /** null **/
  network: InContextSdkMethod<Query['network'], QuerynetworkArgs, MeshContext>,
  /** null **/
  networks: InContextSdkMethod<Query['networks'], QuerynetworksArgs, MeshContext>,
  /** null **/
  globalState: InContextSdkMethod<Query['globalState'], QueryglobalStateArgs, MeshContext>,
  /** null **/
  globalStates: InContextSdkMethod<Query['globalStates'], QueryglobalStatesArgs, MeshContext>,
  /** null **/
  permissionListEntry: InContextSdkMethod<Query['permissionListEntry'], QuerypermissionListEntryArgs, MeshContext>,
  /** null **/
  permissionListEntries: InContextSdkMethod<Query['permissionListEntries'], QuerypermissionListEntriesArgs, MeshContext>,
  /** null **/
  epoch: InContextSdkMethod<Query['epoch'], QueryepochArgs, MeshContext>,
  /** null **/
  epoches: InContextSdkMethod<Query['epoches'], QueryepochesArgs, MeshContext>,
  /** null **/
  networkEpochBlockNumber: InContextSdkMethod<Query['networkEpochBlockNumber'], QuerynetworkEpochBlockNumberArgs, MeshContext>,
  /** null **/
  networkEpochBlockNumbers: InContextSdkMethod<Query['networkEpochBlockNumbers'], QuerynetworkEpochBlockNumbersArgs, MeshContext>,
  /** null **/
  message: InContextSdkMethod<Query['message'], QuerymessageArgs, MeshContext>,
  /** null **/
  messages: InContextSdkMethod<Query['messages'], QuerymessagesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  payload: InContextSdkMethod<Subscription['payload'], SubscriptionpayloadArgs, MeshContext>,
  /** null **/
  payloads: InContextSdkMethod<Subscription['payloads'], SubscriptionpayloadsArgs, MeshContext>,
  /** null **/
  messageBlock: InContextSdkMethod<Subscription['messageBlock'], SubscriptionmessageBlockArgs, MeshContext>,
  /** null **/
  messageBlocks: InContextSdkMethod<Subscription['messageBlocks'], SubscriptionmessageBlocksArgs, MeshContext>,
  /** null **/
  setBlockNumbersForEpochMessage: InContextSdkMethod<Subscription['setBlockNumbersForEpochMessage'], SubscriptionsetBlockNumbersForEpochMessageArgs, MeshContext>,
  /** null **/
  setBlockNumbersForEpochMessages: InContextSdkMethod<Subscription['setBlockNumbersForEpochMessages'], SubscriptionsetBlockNumbersForEpochMessagesArgs, MeshContext>,
  /** null **/
  correctEpochsMessage: InContextSdkMethod<Subscription['correctEpochsMessage'], SubscriptioncorrectEpochsMessageArgs, MeshContext>,
  /** null **/
  correctEpochsMessages: InContextSdkMethod<Subscription['correctEpochsMessages'], SubscriptioncorrectEpochsMessagesArgs, MeshContext>,
  /** null **/
  updateVersionsMessage: InContextSdkMethod<Subscription['updateVersionsMessage'], SubscriptionupdateVersionsMessageArgs, MeshContext>,
  /** null **/
  updateVersionsMessages: InContextSdkMethod<Subscription['updateVersionsMessages'], SubscriptionupdateVersionsMessagesArgs, MeshContext>,
  /** null **/
  changePermissionsMessage: InContextSdkMethod<Subscription['changePermissionsMessage'], SubscriptionchangePermissionsMessageArgs, MeshContext>,
  /** null **/
  changePermissionsMessages: InContextSdkMethod<Subscription['changePermissionsMessages'], SubscriptionchangePermissionsMessagesArgs, MeshContext>,
  /** null **/
  resetStateMessage: InContextSdkMethod<Subscription['resetStateMessage'], SubscriptionresetStateMessageArgs, MeshContext>,
  /** null **/
  resetStateMessages: InContextSdkMethod<Subscription['resetStateMessages'], SubscriptionresetStateMessagesArgs, MeshContext>,
  /** null **/
  registerNetworksMessage: InContextSdkMethod<Subscription['registerNetworksMessage'], SubscriptionregisterNetworksMessageArgs, MeshContext>,
  /** null **/
  registerNetworksMessages: InContextSdkMethod<Subscription['registerNetworksMessages'], SubscriptionregisterNetworksMessagesArgs, MeshContext>,
  /** null **/
  network: InContextSdkMethod<Subscription['network'], SubscriptionnetworkArgs, MeshContext>,
  /** null **/
  networks: InContextSdkMethod<Subscription['networks'], SubscriptionnetworksArgs, MeshContext>,
  /** null **/
  globalState: InContextSdkMethod<Subscription['globalState'], SubscriptionglobalStateArgs, MeshContext>,
  /** null **/
  globalStates: InContextSdkMethod<Subscription['globalStates'], SubscriptionglobalStatesArgs, MeshContext>,
  /** null **/
  permissionListEntry: InContextSdkMethod<Subscription['permissionListEntry'], SubscriptionpermissionListEntryArgs, MeshContext>,
  /** null **/
  permissionListEntries: InContextSdkMethod<Subscription['permissionListEntries'], SubscriptionpermissionListEntriesArgs, MeshContext>,
  /** null **/
  epoch: InContextSdkMethod<Subscription['epoch'], SubscriptionepochArgs, MeshContext>,
  /** null **/
  epoches: InContextSdkMethod<Subscription['epoches'], SubscriptionepochesArgs, MeshContext>,
  /** null **/
  networkEpochBlockNumber: InContextSdkMethod<Subscription['networkEpochBlockNumber'], SubscriptionnetworkEpochBlockNumberArgs, MeshContext>,
  /** null **/
  networkEpochBlockNumbers: InContextSdkMethod<Subscription['networkEpochBlockNumbers'], SubscriptionnetworkEpochBlockNumbersArgs, MeshContext>,
  /** null **/
  message: InContextSdkMethod<Subscription['message'], SubscriptionmessageArgs, MeshContext>,
  /** null **/
  messages: InContextSdkMethod<Subscription['messages'], SubscriptionmessagesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["ebo"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
