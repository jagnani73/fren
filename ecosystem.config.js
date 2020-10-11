module.exports = {
  apps: [
    {
      name: "HackTheMountains-2020",
      script: "./build/app.js",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "HackTheMountains-2020 Flask",
      interpreter: "/usr/bin/python3.8",
      script: "./ml/app.py",
    },
  ],
};
