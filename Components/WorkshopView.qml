import QtQuick 2.7
import QtQuick.Controls 2.1

Item {
    id: workshopView
    visible: false
    // properties
    property alias toolsModel: toolsModel
    property alias projectModel: projectModel
    property alias toolFilter: toolFilter
    property int lastidx
    // elements
    ListModel { id: toolsModel }
    ListModel { id: projectModel }
    StackView {
        id: workshopStack
        anchors.fill: parent
        initialItem: planView
        Item {
            id: planView
            anchors.fill: parent
            Rectangle {
                id: selectorRow
                anchors.top: parent.top
                anchors.topMargin: 50
                anchors.right: parent.right
                anchors.rightMargin: 0
                anchors.left: parent.left
                anchors.leftMargin: 0
                color: "white"
                height: 40
                //
                //
            }
            Rectangle {
                id: separator
                anchors.top: selectorRow.bottom
                anchors.topMargin: 0
                anchors.left: parent.left
                anchors.leftMargin: 0
                anchors.right: parent.right
                anchors.rightMargin: 0
                color: "gray"
                height: 2
            }
            Rectangle {
                id: btnsPanel
                anchors.left: parent.left
                anchors.leftMargin: 10
                anchors.bottom: parent.bottom
                anchors.bottomMargin: 10
                width: 200
                height: 100
                Column {
                    anchors.fill: parent
                    spacing: 20
                    Rectangle {
                        anchors.horizontalCenter: parent.horizontalCenter
                        width: 140
                        height: 40
                        color: "gray"
                        radius: 3
                        MouseArea {
                            anchors.fill: parent
                            onClicked: { root.saveWorkshop() }
                        }
                        Text {
                            anchors.centerIn: parent
                            color: "white"
                            font.pointSize: 12
                            text: "Brouillon"
                        }
                    }
                    Rectangle {
                        anchors.horizontalCenter: parent.horizontalCenter
                        width: 140
                        height: 40
                        color: root.trunkcol
                        radius: 3
                        MouseArea {
                            anchors.fill: parent
                            onClicked: { root.validWorkshop() }
                        }
                        Text {
                            anchors.centerIn: parent
                            color: "white"
                            font.pointSize: 12
                            text: "Valider"
                        }
                    }
                }
            }
            Rectangle {
                id: sidePanel
                anchors.top: separator.bottom
                anchors.topMargin: 10
                anchors.left: parent.left
                anchors.leftMargin: 10
                anchors.bottom: btnsPanel.top
                anchors.bottomMargin: 10
                width: 200
                color: "white"
                border.color: "black"
                border.width: 1
                TextField {
                    id: toolFilter
                    anchors.top: parent.top
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 2
                    onTextChanged: { root.filterWorkshopTools(text) }
                }
                ListView {
                    anchors.top: toolFilter.bottom
                    anchors.topMargin: 5
                    anchors.left: parent.left
                    anchors.leftMargin: 5
                    anchors.right: parent.right
                    anchors.rightMargin: 5
                    anchors.bottom: parent.bottom
                    anchors.bottomMargin: 5
                    model: toolsModel
                    spacing: 10
                    clip: true
                    delegate: Row {
                        spacing: 10
                        Text {
                            anchors.verticalCenter: parent.verticalCenter
                            width: 150
                            text: designation
                        }
                        Rectangle {
                            width: 30; height: 30
                            color: root.trunkcol
                            radius: 3
                            MouseArea {
                                anchors.fill: parent
                                onClicked: { root.addWorkshopElt(code) }
                            }
                            Text {
                                anchors.centerIn: parent
                                color: "white"
                                font.pointSize: 12
                                text: "+"
                            }
                        }
                    }
                }
            }
            Rectangle {
                id: mainZone
                anchors.top: separator.bottom
                anchors.topMargin: 10
                anchors.right: parent.right
                anchors.rightMargin: 10
                anchors.left: sidePanel.right
                anchors.leftMargin: 10
                anchors.bottom: parent.bottom
                anchors.bottomMargin: 10
                color: "white"
                border.color: "black"
                border.width: 1
                Row {
                    id: titleRow
                    anchors.top: parent.top
                    anchors.topMargin: 5
                    anchors.left: parent.left
                    anchors.leftMargin: 5
                    anchors.right: parent.right
                    anchors.rightMargin: 5
                    Label {
                        width: (parent.width-180)*0.7
                        font.bold: true
                        text: "designation"
                    }
                    Label {
                        width: (parent.width-200)*0.3
                        font.bold: true
                        text: "reference"
                    }
                    Label {
                        font.bold: true
                        text: "quantite"
                    }
                }
                Rectangle {
                    anchors.top: titleRow.bottom
                    anchors.topMargin: 0
                    anchors.left: parent.left
                    anchors.leftMargin: 5
                    anchors.right: parent.right
                    anchors.rightMargin: 5
                    color: "gray"
                    height: 1
                }
                ListView {
                    anchors.top: titleRow.bottom
                    anchors.topMargin: 7
                    anchors.left: parent.left
                    anchors.leftMargin: 5
                    anchors.right: parent.right
                    anchors.rightMargin: 5
                    anchors.bottom: parent.bottom
                    anchors.bottomMargin: 5
                    clip: true
                    model: projectModel
                    spacing: 10
                    delegate: Row {
                        anchors.left: parent.left
                        anchors.leftMargin: 5
                        anchors.right: parent.right
                        anchors.rightMargin: 5
                        spacing: 10
                        Label {
                            width: (parent.width-180)*0.7
                            anchors.verticalCenter: parent.verticalCenter
                            text:  designation
                        }
                        Label {
                            width: (parent.width-180)*0.3
                            anchors.verticalCenter: parent.verticalCenter
                            text: reference
                        }
                        SpinBox {
                            width: 120; height: 30
                            editable: true; from: 1
                            value: quantite
                            onValueChanged: { root.changeWorkshopQuantite(idx,value) }
                        }
                        Rectangle {
                            width: 30; height: 30
                            color: root.trunkcol
                            radius: 3
                            MouseArea {
                                anchors.fill: parent
                                onClicked: { root.removeWorkshopElt(idx,index) }
                            }
                            Text {
                                anchors.centerIn: parent
                                font.bold: true
                                color: "white"
                                text: "X"
                            }
                        }
                    }
                }
            }
        }
    }
}
