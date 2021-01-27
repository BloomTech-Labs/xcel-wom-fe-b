export function inProgress(id) {
    return {
        type: 'IN_PROGRESS',
        id: { id }
    }
}