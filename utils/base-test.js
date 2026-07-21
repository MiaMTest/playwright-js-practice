import base from '@playwright/test';

//Import playwright/test module as 'base', calling .extend() returns a new test object that includes custom fixture
//Use base.test.extend() to create custom test fixtures
export const customTest = base.test.extend({
    registrationData:{
    name: "Joe",
    email: "Joe@hotmail.com",
    password: "Ppp000!",
    gender: "Male",
    status: "Employed",
    DOB: "2009-09-19"
}
})
