document.addEventListener("DOMContentLoaded", () => {
    const delayInput = document.getElementById("delay");
    const log = document.getElementById("log");
    const startBtn = document.getElementById("startBtn");
    const startAsyncBtn = document.getElementById("startAsyncBtn");
  
    function getSelectedResult() {
      return document.querySelector('input[name="result"]:checked').value;
    }
  
    function getTimeString() {
      return new Date().toLocaleTimeString('uk-UA');
    }
  
    function simulateAsyncCall(ms, shouldSucceed) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldSucceed) {
            resolve();
          } else {
            reject();
          }
        }, ms);
      });
    }
  
    function logLine(text) {
      log.textContent += `${getTimeString()} ${text}\n`;
    }
  
    // Варіант через .then()
    startBtn.addEventListener("click", () => {
      const delay = Number(delayInput.value);
      const result = getSelectedResult();
  
      logLine("виклик");
  
      simulateAsyncCall(delay, result === "success")
        .then(() => {
          logLine("завершено з успіхом");
        })
        .catch(() => {
          logLine("завершено з помилкою");
        });
    });
  
    // Варіант через async/await
    startAsyncBtn.addEventListener("click", async () => {
      const delay = Number(delayInput.value);
      const result = getSelectedResult();
  
      logLine("виклик");
  
      try {
        await simulateAsyncCall(delay, result === "success");
        logLine("завершено з успіхом");
      } catch {
        logLine("завершено з помилкою");
      }
    });
  });
  