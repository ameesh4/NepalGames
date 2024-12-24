import { createContext, ReactNode, useContext, useState } from "react"

type Profile = {
    email: string
    name: string
    age: number
}

interface ProfileContextValue {
    profile: Profile | null
    setProfile: (profile: Profile) => void
    clearProfile: () => void
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfileState] = useState<Profile|null>(null)

    const setProfile = (profile: Profile) => {
        setProfileState(profile)
    }

    const clearProfile = () => {
        setProfile({ email: "", name: "", age: 0 })
    }

    return (
        <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = ():ProfileContextValue => {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error("useProfile must be used within ProfileProvider")
    }
    return context
}
