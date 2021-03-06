/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
      id
      image
      name
      age
      nationalID
      height
      weight
      dateTime
      location
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
      id
      image
      name
      age
      nationalID
      height
      weight
      dateTime
      location
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
      id
      image
      name
      age
      nationalID
      height
      weight
      dateTime
      location
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
