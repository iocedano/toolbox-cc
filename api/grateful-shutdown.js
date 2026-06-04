const gracefulShutdown = (server) => {
  server.close(() => {
    console.log('Server is shutting down');
    process.exit(0);
  });
};

module.exports = gracefulShutdown;