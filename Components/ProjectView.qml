import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: projectView
    visible: false
    // properties
    property alias lstmodel: projetlistmodel
    property alias clientLn1: clientLn1
    property alias clientLn2: clientLn2
    property alias nameLab: projectnameLab
    property alias nameEdit: projectnameEdit
    property alias adressLab: projectadressLab
    property alias adressEdit: projectadressEdit
    property alias nameSearch: prjtsearchEdit
    property bool newProject: false
    property bool selProject: false
    property int widthrect: 460
    property int widthlab: 65
    property int heightTitle: 40
    // elements
    ListModel { id: projetlistmodel }
    Rectangle {
        y: 70
        anchors.horizontalCenter: parent.horizontalCenter
        color: "white"
        border.color: "black"
        border.width: 1
        width: widthrect
        height: 50
        Text {
            id: clientLn1; x: 20; y: 5
            font.pointSize: 11; font.bold: true
        }
        Text { id: clientLn2; x: 20; y: 30 }
    }
    Rectangle {
        id: newProjectTitle
        y: 140
        anchors.horizontalCenter: parent.horizontalCenter
        color: root.forestcol
        width: parent.widthrect
        height: parent.heightTitle
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if (selProject) selProject = false
                newProject = !newProject
            }
        }
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Nouveau projet"
        }
        Text {
            color: "white"
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            anchors.rightMargin: 10
            font.pointSize: 12
            font.bold: true
            text: (newProject)? "V" : ">"
        }
    }
    Rectangle {
        id: newProjectForm
        visible: parent.newProject
        anchors.top: newProjectTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        width: parent.widthrect
        height: 190
        Column {
            anchors.fill: parent
            anchors.margins: 10
            spacing: 10
            Row {
                spacing: 10
                Label {
                    id: projectnameLab
                    anchors.verticalCenter: parent.verticalCenter
                    width: projectView.widthlab
                    text: "Nom"
                }
                TextField {
                    id: projectnameEdit
                    width: 250
                }
            }
            Row {
                spacing: 10
                Label {
                    id: projectadressLab
                    anchors.verticalCenter: parent.verticalCenter
                    width: projectView.widthlab
                    text: "Adresse"
                }
                TextField {
                    id: projectadressEdit
                    width: 350
                }
            }
            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                Rectangle {
                    width: 140
                    height: 40
                    color: root.trunkcol
                    radius: 3
                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.createProject()
                    }
                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.verticalCenter: parent.verticalCenter
                        color: "white"
                        font.pointSize: 12
                        text: "Créer"
                    }
                }
            }
        }
    }
    Rectangle {
        id: selProjectTitle
        y: 200+((newProject)? newProjectForm.height : 0)
        anchors.horizontalCenter: parent.horizontalCenter
        color: root.forestcol
        width: parent.widthrect
        height: parent.heightTitle
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if (newProject) newProject = false
                selProject = !selProject
            }
        }
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Projet existant"
        }
        Text {
            color: "white"
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            anchors.rightMargin: 10
            font.pointSize: 12
            font.bold: true
            text: (selProject)? "V" : ">"
        }
    }
    Rectangle {
        id: selProjectForm
        visible: parent.selProject
        anchors.top: selProjectTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        width: parent.widthrect
        height: 200
        Row {
            x: 10; y: 10
            id: projectsearchrow
            spacing: 10
            Label {
                width: projectView.widthlab-20
                anchors.verticalCenter: parent.verticalCenter
                text: "Nom"
            }
            TextField {
                id: prjtsearchEdit
                width: 320
                onTextChanged: { root.filterProject(text) }
            }
        }
        ListView {
            anchors.top: projectsearchrow.bottom
            anchors.topMargin: 30
            anchors.left: parent.left
            anchors.leftMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 30
            interactive: true
            spacing: 5
            model: projetlistmodel
            delegate: Rectangle {
                color: "white"
                border.color: "black"
                border.width: 1
                width: 360
                height: 50
                anchors.horizontalCenter: parent.horizontalCenter
                MouseArea {
                    anchors.fill: parent
                    onClicked: { root.accessProject(code) }
                }
                Text {
                    x: 10; y: 5
                    font.pointSize: 11; font.bold: true
                    text: nom+" ("+statut+")"
                }
                Text { x: 10; y:30; text: adresse }
                Text {
                    anchors.verticalCenter: parent.verticalCenter
                    anchors.right: parent.right
                    anchors.rightMargin: 20
                    color: root.trunkcol
                    font.pointSize: 20
                    font.bold: true
                    text: ">"
                }
            }
        }
    }
}
