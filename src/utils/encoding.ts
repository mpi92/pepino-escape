const wraps = Array(4).fill(undefined);

export const encode = (val: any) => wraps
  .reduce(
    (acc, _) => btoa(acc),
    JSON.stringify(val),
  );

export const decode = (val: any) => JSON.parse(
  wraps.reduce(
      (acc, _) => atob(acc),
      val,
    ),
);