const instance = idleTimeout(
    async () => {
      const response = await fetch('/api/users/idle-timeout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log ("re-login required due to idling");
    },
    {
      element: document,
      timeout: 1000 * 10, //page will timeout in 10 seconds if user is idling
      loop: false
    }
  );