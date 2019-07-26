import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: modClientView
    visible: false
    // properties
    property alias civiliteBtn1: civiliteBtn1
    property alias civiliteBtn2: civiliteBtn2
    property alias civiliteBtn3: civiliteBtn3
    property alias nameLab: clientNameLab
    property alias nameEdit: clientNameEdit
    property alias nicknameLab: clientNicknameLab
    property alias nicknameEdit: clientNicknameEdit
    property alias adressLab: clientAdressLab
    property alias adressEdit: clientAdressEdit
    property alias postalLab: clientPostalLab
    property alias postalEdit: clientPostalEdit
    property alias phoneLab: clientPhoneLab
    property alias phoneEdit: clientPhoneEdit
    property alias emailLab: clientEmailLab
    property alias emailEdit: clientEmailEdit
    property alias cityLab: clientCityLab
    property alias cityEdit: clientCityEdit
    property int widthrect: 660
    property int widthlab: 65
    property int heightTitle: 40
    // elements
    Rectangle {
        id: modClientTitle
        y: 70
        anchors.horizontalCenter: parent.horizontalCenter
        width: widthrect; height: heightTitle
        color: root.forestcol
        Text {
            color: "white"
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
            font.pointSize: 12
            font.bold: true
            text: "Modification des informations lient"
        }
    }
    Rectangle {
        anchors.top: modClientTitle.bottom
        anchors.topMargin: 0
        anchors.horizontalCenter: parent.horizontalCenter
        border.color: "gray"
        border.width: 2
        width: widthrect
        height: 370
        Column {
            anchors.fill: parent
            anchors.margins: 20
            spacing: 20
            Row {
                RadioButton {
                    id: civiliteBtn1
                    text: "Monsieur"
                }
                RadioButton {
                    id: civiliteBtn2
                    text: "Madame"
                }
                RadioButton {
                    id: civiliteBtn3
                    text: "Famille"
                }
            }
            Row {
                spacing: 20
                Label {
                    id: clientNameLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    color: "black"; text: "Nom"
                }
                TextField { id: clientNameEdit; width: 200 }
                Label {
                    id: clientNicknameLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    color: "black"
                    text: "Prénom"
                }
                TextField {
                    id: clientNicknameEdit
                    width: 200
                    enabled: !civiliteBtn3.checked
                }
            }
            Row {
                spacing: 20
                Label {
                    id: clientAdressLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Adresse"
                }
                TextField { id: clientAdressEdit; width: 505 }
            }
            Row {
                spacing: 20
                Label {
                    id: clientPostalLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Code Postal"
                }
                TextField { id: clientPostalEdit; width: 200 }
                Label {
                    id: clientCityLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Ville"
                }
                TextField { id: clientCityEdit; width: 200 }
            }
            Row {
                spacing: 20
                Label {
                    id: clientPhoneLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Téléphone"
                }
                TextField { id: clientPhoneEdit; width: 165 }
                Label {
                    id: clientEmailLab
                    width: widthlab
                    anchors.verticalCenter: parent.verticalCenter
                    text: "Email"
                }
                TextField { id: clientEmailEdit; width: 235 }
            }
            Row {
                anchors.horizontalCenter: parent.horizontalCenter
                Rectangle {
                    width: 200
                    height: 40
                    color: root.trunkcol
                    radius: 3
                    MouseArea {
                        anchors.fill: parent
                        onClicked: { root.modClient() }
                    }
                    Text {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.verticalCenter: parent.verticalCenter
                        color: "white"
                        font.pointSize: 12
                        text: "Modifier"
                    }
                }
            }
        }
    }
}
