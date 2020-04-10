export const errorCode = {
  OK: '000000'
}

export const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return parseJSON(resp)
      .then(checkSystemError)
  } else {
    throw new Error(resp.status + ' ' + resp.statusText)
  }
}

export const parseJSON = (resp) => {
  return resp.json()
}

export const checkSystemError = (resp) => {
  if (!resp.status || resp.status.code === errorCode.OK) {
    return resp
  } else {
    // logger.error(`${resp.status.code} ${resp.status.message} ${resp.status.userMessage}`)
    throw new Error(resp.status.code)
  }
}
