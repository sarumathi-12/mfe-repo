// general-info.data.ts

export const GENERAL_INFO_DATA = {
  creditorName: 'Citigroup',
  accountNumber: '1234 5678 9871 1287',

  ownerOptions: ['John Doe', 'Jane Doe'],
  proposalNames: ['Bruce Doe', 'Monica Geller'],
  paymentPriorityOptions: [1, 2, 3],
  proposalAddress: ['Address 1', 'Address 2'],

  defaultValues: {
    ownerOfDebt: 'John Doe',
    proposalName: 'Bruce Doe',
    dueDate: new Date(),
    paymentPriority: 1,
    originalCreditor: 'Citygroup',
    proposalAddress: 'Address 1'
  }
};

export const BALANCE_INFO_DATA = [
  { title: 'Balance', originalInfo: 1333, dmpInfo: 0 },
  { title: 'Monthly Payment', originalInfo: 67, dmpInfo: 0 },
  { title: 'APR', originalInfo: 12, dmpInfo: 0 },
  { title: 'Past Due Amount', originalInfo: 10, dmpInfo: 0 },
  { title: 'Overdue Amount', originalInfo: null, dmpInfo: 0 }
];
