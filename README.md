Invigilate (A platform built to proctor students during their examinations)
•	Online platform built using React JS, Node JS, Python and Firebase that allows organizations (schools and colleges) to conduct their examinations on the platform using google forms.
•	The platform proctors the student during the examination and informs the platform if any malpractices were performed during the test by the student.
•	Face verification every 5 seconds, mobile detection and switching of tabs are some of the key features implemented. 

- There are 2 servers. 
- The react server is set up for authentication and the dashboard of both teachers and students. On this server teachers can schedule exams on their dashboard and on the students dashboard students can enter the test code provided by the teachers and register for the tests.
- The node server is where the examination takes place and face verification takes place. (Face detection takes place every 5 seconds. If the user switches tabs the teacher will be informed on her dashboard.)


