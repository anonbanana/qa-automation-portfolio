export const users = {
  valid: {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  },
  invalidUsername: "username-salah",
  invalidPassword: "password-salah",
  uppercaseUsername: "TomSmith",
  whitespace: "   ",
};

export const messages = {
  loginSuccess: "You logged into a secure area!",
  invalidUsername: "Your username is invalid!",
  invalidPassword: "Your password is invalid!",
  alertAccepted: "You successfully clicked an alert",
  confirmAccepted: "You clicked: Ok",
  confirmDismissed: "You clicked: Cancel",
  promptText: "hello QA",
  promptAccepted: "You entered: hello QA",
  promptDismissed: "You entered: null",
};

export const expected = {
  dropdownOptions: [
    { label: "Please select an option", value: "" },
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ],
  iframeHeading: "An iFrame containing the TinyMCE WYSIWYG Editor",
  iframeDefaultText: "Your content goes here.",
};
