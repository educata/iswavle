const logBtn = document.querySelector('#logBtn');
const removeListenerBtn = document.querySelector('#removeListenerBtn');

logBtn.addEventListener('click', handleClick);

removeListenerBtn.addEventListener('click', () => {
  console.log('გაითიშა დამლოგავი ღილაკის ივენთის მოსმენა');
  logBtn.removeEventListener('click', handleClick);
});

function handleClick() {
  console.log('რაღაც საინტერესო ტექსტი');
}

const messageInput = document.querySelector('#message');

messageInput.addEventListener('keydown', (event) => {
  console.log(`მოხდა ${event.key}-ზე დაჭერა`);
});

messageInput.addEventListener('keyup', (event) => {
  console.log(`მოხდა ${event.key}-ზე აშვება`);
});
