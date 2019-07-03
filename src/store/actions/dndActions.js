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

export function startMoveLinkBetweenColumns(startColumn, startColumnLinksOrder) {
  return {
    type: 'START_MOVE_LINK_BETWEEN_COLUMNS',
    startColumn,
    startColumnLinksOrder,
  }
}

export function finishMoveLinkBetweenColumns(finishColumn, finishColumnLinksOrder) {
  return {
    type: 'FINISH_MOVE_LINK_BETWEEN_COLUMNS',
    finishColumn,
    finishColumnLinksOrder,
  }
}