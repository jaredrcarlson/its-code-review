import { AppState } from "../AppState.js";
import { Keep } from "../models/Keep.js";
import { Vault } from "../models/Vault.js";
import { api } from "./AxiosService.js";

class VaultsService {
  async create(data) {
    const res = await api.post('api/vaults', data)
    const vault = new Vault(res.data)
    AppState.vaults.push(vault)
    if (AppState.profile && AppState.profile.id == vault.creatorId) {
      AppState.profileVaults.push(vault)
    }
  }

  async getById(id) {
    try {
      const res = await api.get(`api/vaults/${id}`)
      res.data.keeps = await this.getKeepsByVaultId(id)
      AppState.vault = new Vault(res.data)
      return res
    } catch (error) {
      return error.response
    }
  }

  async getKeepsByVaultId(id) {
    const res = await api.get(`api/vaults/${id}/keeps`)
    const keeps = res.data.map(data => new Keep(data))
    return keeps
  }

  async update(id, data) {
    const res = await api.put(`api/vaults/${id}`, data)
    AppState.vault = new Vault(res.data)
    const i = AppState.vaults.findIndex(vault => vault.id == id)
    if (i != -1) {
      AppState.vaults.splice(i, 1, AppState.vault)
    }
  }

  async remove(id) {
    await api.delete(`api/vaults/${id}`)
    this.clear()
    const i = AppState.vaults.findIndex(vault => vault.id == id)
    if (i != -1) {
      AppState.vaults.splice(i, 1)
    }
  }

  async removeKeep(keep) {
    // const i = AppState.vault.keeps.findIndex(k => k.id == keep.id)
    // AppState.vault.keeps.splice(i, 1)
    AppState.vault.keeps = AppState.vault.keeps.filter(k => k.id != keep.id)
  }

  // async toggleIsPrivate(vault) {
  //   const data = { ...vault }
  //   data.isPrivate = !data.isPrivate
  //   await this.update(vault.id, data)
  // }

  clear() {
    AppState.vault = null
  }
}
export const vaultsService = new VaultsService();