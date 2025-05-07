module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",  // Usa babel-jest para transpilar JSX y JS
    },
    testEnvironment: "jest-environment-jsdom",  // Ahora se debe instalar explícitamente
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };