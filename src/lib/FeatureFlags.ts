let VITE_BUILD_DATE = import.meta.env.VITE_BUILD_DATE ?? (+new Date() / 1000).toString();
export const BUILD_DATE = new Date(parseInt(VITE_BUILD_DATE) * 1000);
