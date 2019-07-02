export function moveColumn(newColumnOrder) {
  return {
    type: 'MOVE_COLUMN',
    payload: newColumnOrder,
  }
}

export function moveLinkInsideColumn(id, newLinkOrder) {
  return {
    type: 'MOVE_LINK_INSIDE_COLUMN',
    columnId: id,
    payload: newLinkOrder,
  }
}