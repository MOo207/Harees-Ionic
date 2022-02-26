import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ChildMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Child {
  readonly id: string;
  readonly name: string;
  readonly image?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Child, ChildMetaData>);
  static copyOf(source: Child, mutator: (draft: MutableModel<Child, ChildMetaData>) => MutableModel<Child, ChildMetaData> | void): Child;
}