import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    // properties
    property color identcol: "black"
    property color passwdcol: "black"
    property alias identval: identifiantEdit.text
    property alias passwdval: passwordEdit.text
    // elements
    Image {
        anchors.fill: parent
        source: "../imgs/maisonkokoon.jpg"
        fillMode: Image.PreserveAspectCrop
        clip: true
    }
    Label {
        x: 100; y: 80
        color: "#444444"
        font.pointSize: 27
        font.bold: true
        horizontalAlignment: Text.AlignRight
        text: "Une envie ?\nConstruisez-la !"
    }
    Rectangle {
        id: grayScreen
        visible: root.connect
        anchors.fill: parent
        color: "#777777"
        opacity: 0.5
        MouseArea {
            anchors.fill: parent
            onClicked: {
                identifiantLab.color = "black"
                passwordLab.color = "black"
                root.connect = false
            }
        }
    }
    Rectangle {
        id: connectScreen
        visible: root.connect
        color: "white"
        border.color: "gray"
        border.width: 2
        anchors.top: parent.top
        anchors.topMargin: 80
        anchors.horizontalCenter: parent.horizontalCenter
        width: 300
        height: 300
        MouseArea { anchors.fill: parent; onClicked: {} }
        Column {
            anchors.fill: parent
            padding: 20
            spacing: 10
            Label {
                anchors.horizontalCenter: parent.horizontalCenter
                text: "Se connecter"
                font.pointSize: 14
                font.bold: true
                padding: 10
            }
            Label {
                color: identcol
                id: identifiantLab
                text: "Identifiant"
                font.pointSize: 11
            }
            TextField {
                id: identifiantEdit
                width: parent.width-40
                placeholderText: "Identifiant"
                onAccepted: { root.tryConnection() }
            }
            Label {
                color: passwdcol
                id: passwordLab
                text: "mot de passe"
                font.pointSize: 11
            }
            TextField {
                id: passwordEdit
                echoMode: TextField.Password
                width: parent.width-40
                placeholderText: "Mot de passe"
                onAccepted: { root.tryConnection() }
            }
            Rectangle {
                width: parent.width-60
                height: 40
                anchors.horizontalCenter: parent.horizontalCenter
                color: root.trunkcol
                radius: 3
                MouseArea {
                    anchors.fill: parent
                    onClicked: root.tryConnection()
                }
                Text {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.verticalCenter: parent.verticalCenter
                    color: "white"
                    text: "Connexion"
                    font.pointSize: 12
                }
            }
        }
    }
}
