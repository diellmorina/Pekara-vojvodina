const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const top = element.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const form = document.querySelector('form');
const successMessage = document.getElementById('form-success');

if (form && successMessage) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button');
    if (button) {
      button.textContent = 'Sending...';
      button.disabled = true;
    }

    try {
      await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      successMessage.classList.add('show');
      form.reset();

      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 3500);
    } catch (error) {
      successMessage.textContent = 'Something went wrong. Please try again.';
      successMessage.classList.add('show');
      successMessage.style.background = '#f8d7da';
      successMessage.style.color = '#842029';
      setTimeout(() => {
        successMessage.classList.remove('show');
        successMessage.textContent = 'Message sent successfully!';
        successMessage.style.background = '#d1fae5';
        successMessage.style.color = '#166534';
      }, 3500);
    } finally {
      if (button) {
        button.textContent = 'Send Inquiry';
        button.disabled = false;
      }
    }
  });
}
