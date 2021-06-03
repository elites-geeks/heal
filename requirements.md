# Software Requirements
## Vision
What is the vision of this product?
to have an application that integrate patients, doctors, insurance compnays and other health care institutions  with one fully implemented highly-scale system to facilitate the preocess of patients treatements, removing the overhead of documenting user medical records and patient history using inefficient papre-based system and minimize the cost of time,money and efforts on all parts.     

What pain point does this project solve?
remove the time cost and reduce any potential error during patients treatment procces caused by the non-reliable manual system.  

Why should we care about your product?
because it's fully-integrated, error-proof, and cost-reducing system. We are in a world that wasting time is very expensive on people's lives, using our system we care for people time as well as their health. Besides, error-prone systems are really frustrated for all parts, with our reliable system we take care to not be a source of frustration but a source of hope and prosperity.  

## Scope (In/Out)
* IN - What will our product do 
    * our website will connect all parties involved in the treatment process together
    * our website preserve data in a consistent and secure database
    * our website will have a window to each type of user based on their role
    * our website will notify the patient whenever an action or a status has been taken on their transactions. 
    * our website will provide the patient with all info about hospitals, doctors, and insurance companies.
* OUT - What will our product not do 
    * Our website will never turn into an IOS or Android app
    * Our website will not offer discount for patients when they do any medical procedure

## Functional Requirements
### Minimum Viable Product (MVP) 
1. when the user clicks on a protected endpoint, he should be redirected to the registration page.
2. when the administrative departemnet he user's request to sign up, they can confirm the registration or not.
3. the user will be notified when the registration is accepted.
4. the user can signup using third-party providors like Google, Facebook, Linkedin.
5. build a subscribtion form  for insurance company.
6. when the user submits the form, the info will be redirected to the company to get accepted and they will receive a notification of the status.
7. when the patient's subscription has been reviewed and the action was taken from the insurance company, they will be notified.
8. notify us with each medical request that needs to be covered by the insurance.
9. create a component where I can review the doctor's request and has the ability to accept or decline.
10. when we accept the request, notify the user and change the cost according to the insurance policy.
11. view all the available hospitals for the patient to choose from.
12. generate a token for the patient after he/she chose the hospital.
13. permite the accountant to enter to the patient's procedures using the token.
14. confirm the payment and send the invoive to the patient.
15. change the status of the procedure to be confirmed.
16. allow medical staff to use the same token  that the user used when they paid the bill, to get access to procedure they paid for.
17. allow the medical staff to change the status when the procedures completed.
18. notify the patient with  his/her latest status and log it to the history.
19. add the time when the procedure finished to the patient's dashboard.
20. add the ability for the doctor to enter the patient token and view the history and info.
21. add a form, so doctor can enter disgnoses or any other procedures.
22. add the ability for the doctor to send a request to the insurance company with the cost of the doctor procedure. 
23. notify the insurance company according to the insurance compnay confirmation complete the procedure.
24. notify me with all registration requests to review them.
25. check if the input is invalid or valid.
26. send a notification to the user with the status of him/her request.
27. delete a specific user from the system    

### Strech
1. make a vedio call when the patient wants to subscribe to an insurance company
2. add the ability to the user to send and receive messages with the doctor
3. add in-patient services.

### Data Flow
the user of any type will be presented with a customized registration form according to their role. after submitng the form the admin will review the form and validate the information and make actions based on the validity of the information.Then the user will be notified with the status of their signup reguest. the patient will be able to open a visit to a doctor clinic. doctors will have access to the patients profile and history. if the patient has an insurance then the doctor can send a request to the insurance compnay with the cost of the doctor preocedure. the insurance company has acccess to the patient profile and history, where they can the coverage of the procedure or not. The patient will then choose his preffered hospital to go to. The patient will given a token number form the accountant at the selected hospital and the accountant then will approve that the payment has been comppleted. The medical staff can redeem the token and complete the procedure. 

## Non-Functional Requirements

1. Security
2. Usability
3. Testability
4. Authorization
5. Scalability
6. Maintenance
7. Reliability
