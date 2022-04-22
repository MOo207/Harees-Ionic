import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ReportMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Report {
  readonly id: string;
  readonly reportedBy: string;
  readonly image?: string;
  readonly name?: string;
  readonly age?: number;
  readonly gender?: string;
  readonly description?: string;
  readonly healthStatus?: string;
  readonly nationalID?: string;
  readonly height?: number;
  readonly weight?: number;
  readonly dateTime?: string;
  readonly lat?: number;
  readonly lng?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Report, ReportMetaData>);
  static copyOf(source: Report, mutator: (draft: MutableModel<Report, ReportMetaData>) => MutableModel<Report, ReportMetaData> | void): Report;
}