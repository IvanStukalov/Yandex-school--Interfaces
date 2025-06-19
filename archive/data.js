export const dateFrom = "2025-02-01";
export const dateTo = "2025-02-28";

export const data = [
  {
    id: "1",
    deps: ["2"],
    versions: [
      {
        from: "2025-01-01T00:00:00Z",
        to: "2025-02-01T00:00:00Z",
        text: "String 11",
      },
      {
        from: "2025-02-01T00:00:00Z",
        to: "2025-03-01T00:00:00Z",
        text: "String 12",
      },
      {
        from: "2025-03-01T00:00:00Z",
        to: "2025-04-01T00:00:00Z",
        text: "String13",
      },
    ],
  },
  {
    id: "2",
    deps: [],
    versions: [
      {
        from: "2025-01-01T00:00:00Z",
        to: "2025-02-01T00:00:00Z",
        text: "String 21",
      },
      {
        from: "2025-02-01T00:00:00Z",
        to: "2025-03-01T00:00:00Z",
        text: "String 22",
      },
      {
        from: "2025-03-01T00:00:00Z",
        to: "2025-03-01T00:00:00Z",
        text: "String 23",
      },
    ],
  },
  {
    id: "3",
    deps: [],
    versions: [
      {
        from: "2025-01-01T00:00:00Z",
        to: "2025-02-01T00:00:00Z",
        text: "String 31",
      },
      {
        from: "2025-02-01T00:00:00Z",
        to: null,
        text: "String 32",
      },
    ],
  },
];
