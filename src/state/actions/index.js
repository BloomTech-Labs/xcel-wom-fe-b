// import all of your actions into this file, and export them back out. 
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose. 
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving. 
// Declare action TYPES at the top of the file

function submitOrder() {
    return {
        type: 'SUBMIT_ORDER'
    }
}

function markUrgent() {
    return {
        type: 'MARK_URGENT'
    }
}

function markNormal() {
    return {
        type: 'MARK_NORMAL'
    }
}

function inProgress() {
    return {
        type: 'IN_PROGRESS'
    }
}

function completed() {
    return {
        type: 'COMPLETED'
    }
}

export {
    submitOrder,
    markUrgent,
    markNormal,
    inProgress,
    completed
};