# Link ![image](https://github.com/user-attachments/assets/933dd378-586d-405d-b09b-4cb5f90b16cc)

Link is a mobile web app developed for the Israel Internet Association, designed to address the growing need for guidance and assistance in managing online dangers and emergencies.
The app offers a structured system for classifying, handling, and providing support for inquiries related to internet threats and online crises. It provides targeted instructions to prevent escalation in cyber incidents, tracks harmful trends, manages urgent reports, and delivers real-time updates on current online dangers.
At its core, the app features a user-friendly flow that asks guiding questions and delivers tailored responses based on the association's existing resources. 
This ensures users receive support and maintain calm during stressful situations. 
The app also includes the ability to submit reports, view ongoing updates provided by the association and share them on whatsapp to raise awarness.

![image](https://github.com/user-attachments/assets/fccdc4d5-9af9-4e54-9eb4-fb9dee8b10f8)

## Button Flow for Reporting

Currently, the website features a specific sequence of buttons that interact with each other in a predefined order to help users navigate the process of reporting and resolving an online issue.
To trigger the desired functionality, follow this sequence:

1. **ספר לי מה קרה:** נפלתי קורבן לפישינג.
2. **האם הכנסת פרטים אישיים?** לא.
3. **האם הכנסת פרטים כמו שם משתמש וסיסמה?** כן.
4. **האם שם המשתמש והסיסמא שהזנת משמשים אותך גם לשירותים נוספים?** לא.
5.  **האם הגדרתם אימות דו-שלבי(Two Factor Authentication)?** כן.
6.  **צלם את המסך** צילמתי מסך.
7.  **האם מסרת פרטים לתשלום?** הזנתי את פרטי הPayPal.
8. **האם הורדת קובץ כלשהו למכשיר?** כן.
9. **המלצתנו היא לא לפתוח את הקובץ, מחשש שמדובר בוירוס.** פתחתי את הקובץ.
10. **האם אתה חושד שהותקנה נוזקה או כופרה במכשיר שלך?** אני חושב שפרצו לי למחשב.
11. **האם יש לך גיבוי למחשב?** אין לי גיבוי למחשב.
12. **תודה על הסבלנות!** חבר אותי למידע.
13. **ריכזתי עבורך את כל המידע שיסייע לך להתמודד** מדריך- תכנית ההגנה של פייפאל.
 -כפתורי סימתי אפשר להמשך--
14. **ריכזתי עבורך את כל המידע שיסייע לך להתמודד** מדריך- פרצו לי למחשב.
-כפתורי סימתי אפשר להמשך--
15. **האם יש לך גיבוי למחשב?** סיים כאן. 

## To run locally:
Ensure you have a local copy of the repository, and, in your terminal, navigate
to the root of the repository.
### Install the dependencies
```bash
npm install
```
### Configure local environment variables
```bash
cp .env.local.template .env.local
```
### Run the development server
```bash
npm run dev
```
## View the application in your browser
```bash
http://localhost:3000
```
