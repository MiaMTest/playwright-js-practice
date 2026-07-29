# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginPagePractice.spec.js >> Block by alert when login with incorrect username
- Location: tests/loginPagePractice.spec.js:5:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.form-control').last()
    - locator resolved to <select class="form-control" data-style="btn-info">…</select>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    53 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learning@830$3mK2
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [active] [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect } from "@playwright/test";
  2  | 
  3  | export class LoginPage {
  4  |     //Using JSDoctype hinting to get autocomplete(IntelliSensense) and method suggestions
  5  |     /**
  6  |    * @param {import('@playwright/test').Page} page
  7  |    */
  8  |     constructor(page) {
  9  |         this.page = page;
  10 |         this.userNameInput = page.locator('#username');
  11 |         this.passwordInput = page.locator('#password');
  12 |         this.userRole = page.locator('.form-control').last();
  13 |         this.termsCheckbox = page.locator('#terms');
  14 |         this.signInBtn = page.locator('#signInBtn');
  15 |         this.alertMsg = page.getByText('Empty username/password.');
  16 |         this.userRadioType = page.locator('.radiotextsty').last();
  17 |         this.popupOkBtn = page.locator('#okayBtn');
  18 |         this.docLink = page.locator('[href*="documents-request"]');
  19 |         this.SmartHireLink = page.getByRole('link', { name: /TechSmartHire/ });
  20 | 
  21 | 
  22 |     }
  23 | 
  24 |     async login(username, password) {
  25 |         await this.userNameInput.fill(username);
  26 |         await this.passwordInput.fill(password);
  27 |         await this.userRadioType.click();
  28 |         await this.popupOkBtn.click();
> 29 |         await this.userRole.click();
     |                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  30 |         await this.userRole.selectOption('consult')
  31 |         await this.termsCheckbox.click();
  32 |         await this.signInBtn.click();
  33 | 
  34 | 
  35 |     }
  36 | 
  37 |     getBlinkingLinks() {
  38 |         return {
  39 |             docLink: this.docLink,
  40 |             smartHireLink: this.SmartHireLink
  41 | 
  42 |         }
  43 |     }
  44 | 
  45 | }
  46 | 
  47 | 
```