import { AppState } from "../AppState.js";
import { Keep } from "../models/Keep.js";
import { Profile } from "../models/Profile.js";
import { Vault } from "../models/Vault.js";
import { api } from "./AxiosService.js";

class ProfilesService {
  async getProfileById(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.profile = new Profile(res.data)
  }

  async getKeepsByProfileId(id) {
    const res = await api.get(`api/profiles/${id}/keeps`)
    AppState.profileKeeps = res.data.map(data => new Keep(data))
  }

  async getVaultsByProfileId(id) {
    const res = await api.get(`api/profiles/${id}/vaults`)
    AppState.profileVaults = res.data.map(data => new Vault(data))
  }

  clear() {
    AppState.profile = null
    AppState.profileVaults = []
    AppState.profileKeeps = []
  }
}
export const profilesService = new ProfilesService();