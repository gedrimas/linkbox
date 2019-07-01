export function moveColumn(newColumnOrder) {
  return {
    type: 'MOVE_COLUMN',
    payload: newColumnOrder,
  }
} 