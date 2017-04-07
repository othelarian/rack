import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: validityView
    visible: false
    // properties
    property alias timer: validTimer
    // elements
    Timer {
        id: validTimer
        interval: 4000; running: false; repeat: false
        onTriggered: { root.backStack() }
    }
    Rectangle {
        anchors.top: parent.top
        anchors.topMargin: 70
        anchors.horizontalCenter: parent.horizontalCenter
        width: 510
        height: 340
        color: "white"
        border.color: "black"
        border.width: 1
        Label {
            id: confirmLab
            anchors.top: parent.top
            anchors.topMargin: 20
            anchors.horizontalCenter: parent.horizontalCenter
            color: root.forestcol
            font.bold: true
            font.pointSize: 15
            text: "Confirmation du devis"
        }
        Image {
            id: validImg
            anchors.top: confirmLab.bottom
            anchors.topMargin: 20
            anchors.horizontalCenter: parent.horizontalCenter
            source: "../imgs/valid.png"
            height: 150
            width: 150
            fillMode: Image.PreserveAspectFit
        }
        Label {
            anchors.top: validImg.bottom
            anchors.topMargin: 20
            anchors.horizontalCenter: parent.horizontalCenter
            horizontalAlignment: Text.AlignHCenter
            font.bold: true
            font.pointSize: 12
            text: "Le devis va être envoyé au client par mail.\nLa direction des études va étudier le dossier pour validation."
        }
    }
}
