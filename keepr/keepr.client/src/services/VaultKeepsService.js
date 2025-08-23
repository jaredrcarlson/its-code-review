import { AppState } from "../AppState.js";
import { VaultKeep } from "../models/VaultKeep.js";
import { api } from "./AxiosService.js"

class VaultKeepsService {
  async create(data) {
    const res = await api.post('api/vaultkeeps', data)
    AppState.vaultkeep = new VaultKeep(res.data)
    AppState.vaultkeeps.push(AppState.vaultkeep)
  }

  async remove(id) {
    await api.delete(`api/vaultkeeps/${id}`)
    const i = AppState.vaultkeeps.findIndex(vaultkeep => vaultkeep.id == id)
    if (i != -1) {
      AppState.vaultkeeps.splice(i, 1)
    }
  }
}
export const vaultKeepsService = new VaultKeepsService();