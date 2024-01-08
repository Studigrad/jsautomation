import moment from 'moment';
require('dotenv').config()

class Api {
async returnMemberObject(memberEmail, memberPassword, memberType = 'member') {
  const memberHost = `QA-member.timelymd.io`

  let url = 'https://' + memberHost + '/v1/me/login'

  let payload = {
    email: memberEmail,
    password: memberPassword,
    user_type: memberType,
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }

  let memberData = await fetch(url, options).then((response) => {
    console.log(response.status)
    return response.json()
  })

  console.log('member id:', memberData.member_id)
  return memberData
}

async loginProvider(providerEmail, providerPassword) {
  let environmentCode = process.env.CODE_ENV

  const providerHost = `qa-provider.timelymd.io`

  let url = 'https://' + providerHost + '/v1/me/login'

  let payload = {
    email: providerEmail,
    password: providerPassword,
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }

  let providerData = await fetch(url, options).then((response) => {
    console.log(response.status)
    return response.json()
  })

  console.log('provider id:', providerData.provider_id)

  return providerData
}

async scheduleCurrentVisit(memberData, providerData, visitType, reasonForVisit) {
  const date = new Date()
  const hostName = `QA-member.timelymd.io`
  const currentDate = moment(date.setSeconds(date.getSeconds() + 3))
    .utc()
    .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

  let url = `https://${hostName}/v1/${memberData.member_id}/visits/scheduled/${visitType}/${providerData.provider_id}`
  // console.log(memberData)

  let payload = {
    pending_visit: {
      visit_type: visitType,
      pharmacy: {
        external_id: '400',
        name: 'AAA5 Pharmacy',
      },
      scheduled_at: currentDate.toString(),
      timezone: memberData.timezone,
      member_dob: memberData.member_dob,
      member_last_name: memberData.member_last_name,
      member_first_name: memberData.member_first_name,
      provider_timezone: providerData.timezone,
      provider_name: providerData.provider_name,
      provider_id: providerData.provider_id,
      modality: 'video',
      // phone: {
      //   number: memberData.member.phones[0].number, //FIXME: Removing this test from pipeline to investigate member data response no longer providing the members cell
      //   type: memberData.member.phones[0].type,
      // },
      reason_for_visit: reasonForVisit,
      location_country: 'US',
      location: 'TX',
      member_id: memberData.member_id,
    },
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': memberData.auth.token,
    },
    body: JSON.stringify(payload),
  }

  let psychVisitNow = await fetch(url, options).then((response) => {
    console.log(response.status)
    return response.json()
  })
}
}

export default new Api()