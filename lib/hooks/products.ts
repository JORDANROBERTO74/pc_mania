'use server'
import { google } from 'googleapis'

export async function getSheetData() {
  const glAuth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: 'googleapis.com'
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  const glSheets = google.sheets({ version: 'v4', auth: glAuth })

  const data = await glSheets.spreadsheets.values.get({
    spreadsheetId: '11XQQTG1g-k5PqZcH2uiyYHcb1SWnIoTfiusmARP3Sp0',
    range: 'Sheet1!A:Z'
  })

  return { data: data.data.values }
}

export async function appendSheetData(values: string[]) {
  const glAuth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: 'googleapis.com'
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  const glSheets = google.sheets({ version: 'v4', auth: glAuth })

  const appendResponse = await glSheets.spreadsheets.values.append({
    spreadsheetId: '11XQQTG1g-k5PqZcH2uiyYHcb1SWnIoTfiusmARP3Sp0',
    range: 'Sheet1!A:Z',
    valueInputOption: 'RAW',
    requestBody: {
      values: [values]
    }
  })

  return { status: appendResponse.status, data: appendResponse.data }
}

export async function updateSheetData(rowNumber: number, values: string[]) {
  const glAuth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: 'googleapis.com'
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  const glSheets = google.sheets({ version: 'v4', auth: glAuth })

  const spreadsheetId = '11XQQTG1g-k5PqZcH2uiyYHcb1SWnIoTfiusmARP3Sp0'
  const range = `Sheet1!A${rowNumber}:Z${rowNumber}`

  const updateResponse = await glSheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values]
    }
  })
  return { status: updateResponse.status, data: updateResponse.data }
}
