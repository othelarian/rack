import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: modelView
    visible: false
    // properties
    property alias lstgammes: gammeslistmodel
    property alias lstmodeles: modeleslistmodel
    property alias projectLn1: projectLn1
    property alias projectLn2: projectLn2
    //
    property alias gammeValue: projectGammeValue
    property alias gammeEdit: projectGammeEdit
    property alias modeleValue: projectModeleValue
    property alias modeleEdit: projectModeleEdit
    //
    property alias workshopBtn: workshopBtn
    //
    property int widthrect: 660
    property int widthlab: 65
    property int heightTitle: 40
    // elements
    ListModel { id: gammeslistmodel }
    ListModel { id: modeleslistmodel }
    Rectangle {
        y: 70
        anchors.horizontalCenter: parent.horizontalCenter
        color: "white"
        border.color: "black"
        border.width: 1
        width: widthrect
        height: 50
        Text {
            id: projectLn1; x: 20; y: 5
            font.pointSize: 11; font.bold: true
        }
        Text { id: projectLn2; x: 20; y: 30 }
        MouseArea {
            anchors.fill: parent
            //onClicked: { root.accessModProject() }
        }
    }
    Rectangle {
        id: modelTitle
        y: 140
        width: widthrect;height: heightTitle
        anchors.horizontalCenter: parent.horizontalCenter
        color: root.forestcol
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Paramètres du projet"
        }
    }
    Rectangle {
        id: projectForm
        width: widthrect
        height: 250
        anchors.top: modelTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 20
            Row {
                spacing: 20
                Label {
                    id: projectGammeLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Gamme"
                }
                Text {
                    id: projectGammeValue
                    visible: false
                    width: 200
                    anchors.verticalCenter: parent.verticalCenter
                    font.bold: true
                }
                ComboBox {
                    id: projectGammeEdit
                    visible: false
                    width: 200
                    model: gammeslistmodel
                    textRole: "text"
                    onCurrentIndexChanged: { root.changeGamme(model.get(currentIndex).code) }
                }
                Label {
                    id: projectModeleLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Modèle"
                }
                Text {
                    id: projectModeleValue
                    visible: false
                    width: 200
                    anchors.verticalCenter: parent.verticalCenter
                    font.bold: true
                }
                ComboBox {
                    id: projectModeleEdit
                    visible: false
                    width: 200
                    model: modeleslistmodel
                    textRole: "text"
                    onCurrentIndexChanged: { root.changeModele(model.get(currentIndex).code) }
                }
            }
            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                Rectangle {
                    id: workshopBtn
                    property string btnLabel
                    width: 200; height: 40
                    color: root.trunkcol
                    radius: 3
                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.accessProject()
                    }
                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.verticalCenter: parent.verticalCenter
                        color: "white"
                        text: parent.btnLabel
                        font.pointSize: 12
                    }
                }
            }
        }
    }
}
