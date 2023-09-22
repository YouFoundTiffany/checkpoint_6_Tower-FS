import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Pop from '../utils/Pop.js'
import { Ticket } from '../models/Ticket.js'
Ticket


class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTicketsByAcc() {
    try {
      const response = await api.get('account/tickets')
      logger.log('my tickets', response.data)
      AppState.myTickets = response.data.map(ticket => new Ticket(ticket))
    } catch (error) {
      Pop.error(error)
    }
  }

}

export const accountService = new AccountService()
