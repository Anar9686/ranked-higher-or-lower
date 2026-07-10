export const backgrounds = Object.values(
  import.meta.glob("./*.jpg", {
    eager: true,
    import: "default",
  }),
) as string[];
