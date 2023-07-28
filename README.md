# Symptom Checker

A simple symptom checker and information counter software developed for [Temasek Foundation SCALE](https://temasekfoundation.org.sg/programmes-s/Specialists-Community-Action-and-Leadership-Exchange-SCALE-Programmes).  
Prototype done in a day (hence code may not be very stable).

I did this in April 2023.

This is part of my Overseas Sustainable Innovation Project, in Phnom Penh and Takeo Province, Cambodia.

Much thanks to Temasek Foundation for sponsoring my trip for the Sustainable Innovation project.

## What does it do?
This is a web app written in a mix of JavaScript and TypeScript, for React. It presents users with a list of questions, populated from a JSON structure.  
The UI is written in JSX, styling with MUI and inline styles.  
It also has a component featuring QR scanning and generation for membership.  

This is a prototype for software intended to be run on a healthcare machine targeting women in [Sla Commune](https://en.wikipedia.org/wiki/Sla_Commune), Takeo Province, in the Cambodia.

## What I've learnt (and what not to do next time...)
I've learnt more about using React, and the TypeScript programming language through this project. It also got me to rapidly prototype apps/websites with greater speed than before (in which my participation in competitions helped)  
I did this in a day, and I would say that there are some things I wished I could have done better, and will definitely take note of in the future:
- `useState` in a mapping function  
  To get toggle button groups to work, I resorted to using `useState` in a mapping function, which resulted in unintended consequences. As the app had multiple pages kept in track by states, when it moved to the next page, the app will crash if the array supplied was not equal in length to the previous stage. As such, I had to design questions such that each stage would have the same number of questions, which was sub-optimal.
- Global variables instead of `useMemo`  
  I only learnt about `useMemo` afterwards. I used global variables and (at some point) a tracking mechanism to make sure I don't update it when I wasn't supposed to, (the initialisation code kept running on each stage change)

## Conclusion
All in all, this was a good learning experience, and I have become more confident in React, TS/JS and web technologies through this short prototype.

Thanks for reading :)

~ czlucius

