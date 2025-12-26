[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/7jTrgXmk)
# Hospital Appointment Management System

Bu proje, bir hastane randevu sisteminin UML diyagramları ve basit bir web uygulaması ile modellenmesini amaçlamaktadır.

## Use Case Diagram
![Use Case Diagram](projese_use_case.png)

## Class Diagram
![Class Diagram](projeclass_diagram.png)

## Sequence Diagrams

### Book Appointment
![Book Appointment Sequence](sequence_diagram.jpeg.jpeg)

### Doctor Views Appointments
![Doctor Sequence](Sequence_diagramdtocor.png)




## 📝 Use Case Senaryosu
Sequence diagram ile modellenen ana etkileşim:
**Hasta Randevu Alma (Book Appointment)**  
Detaylı senaryo Word belgesinde yer almaktadır.

## 🧩 PlantUML Kodları

### Book Appointment – PlantUML
```plantuml
@startuml
actor Patient
boundary "Patient UI" as UI
control "Appointment Controller" as AC
database "Appointment DB" as DB

Patient -> UI : Request Appointment
UI -> AC : createAppointment()
AC -> DB : saveAppointment(status="Pending")
DB --> AC : success
AC --> UI : confirmation
UI --> Patient : Appointment Created
@enduml


@startuml
actor Doctor
boundary "Doctor UI" as UI
control "Appointment Controller" as AC
database "Appointment DB" as DB

Doctor -> UI : Login
UI -> AC : authenticateDoctor()
AC -> DB : checkCredentials()
DB --> AC : valid
AC --> UI : loginSuccess

Doctor -> UI : View Appointments
UI -> AC : getAppointments(doctorId)
AC -> DB : fetchAppointments(doctorId)
DB --> AC : appointmentList
AC --> UI : displayAppointments
UI --> Doctor : Show Appointment List
@enduml


## 💻 Uygulama Dosyaları
- index.html
- script1.js
- style1.css
