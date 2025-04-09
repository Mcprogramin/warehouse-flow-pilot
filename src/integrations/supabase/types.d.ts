
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      robots: {
        Row: {
          id: string
          name: string
          model: string
          status: string
          battery_level: number
          location: Json | null
          payload: string | null
          owner_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          model: string
          status: string
          battery_level: number
          location?: Json | null
          payload?: string | null
          owner_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          model?: string
          status?: string
          battery_level?: number
          location?: Json | null
          payload?: string | null
          owner_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "robots_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_settings: {
        Row: {
          id: string
          pathfinding_algorithm: string | null
          computation_priority: number | null
          dynamic_rerouting: boolean | null
          storage_strategy: string | null
          auto_reorganization: boolean | null
          speed_limit: number | null
          recharge_threshold: number | null
          collision_avoidance: boolean | null
          automated_charging: boolean | null
          theme: string | null
          animations_enabled: boolean | null
          realtime_updates: boolean | null
          update_frequency: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          pathfinding_algorithm?: string | null
          computation_priority?: number | null
          dynamic_rerouting?: boolean | null
          storage_strategy?: string | null
          auto_reorganization?: boolean | null
          speed_limit?: number | null
          recharge_threshold?: number | null
          collision_avoidance?: boolean | null
          automated_charging?: boolean | null
          theme?: string | null
          animations_enabled?: boolean | null
          realtime_updates?: boolean | null
          update_frequency?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          pathfinding_algorithm?: string | null
          computation_priority?: number | null
          dynamic_rerouting?: boolean | null
          storage_strategy?: string | null
          auto_reorganization?: boolean | null
          speed_limit?: number | null
          recharge_threshold?: number | null
          collision_avoidance?: boolean | null
          automated_charging?: boolean | null
          theme?: string | null
          animations_enabled?: boolean | null
          realtime_updates?: boolean | null
          update_frequency?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
