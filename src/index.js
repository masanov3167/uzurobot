require("./core");

process.on('unhandledRejection', (err, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', err)
    // You can add your own error handling logic here, such as sending an error message to the user.
  })