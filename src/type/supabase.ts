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
      comment_like: {
        Row: {
          comment_id: number | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          comment_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          comment_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'comment_like_comment_id_fkey'
            columns: ['comment_id']
            isOneToOne: false
            referencedRelation: 'comments'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comment_like_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      comments: {
        Row: {
          comment_content: string | null
          created_at: string
          id: number
          like_num: number | null
          profile_img: number | null
          user_name: string | null
          video_id: string | null
        }
        Insert: {
          comment_content?: string | null
          created_at?: string
          id?: number
          like_num?: number | null
          profile_img?: number | null
          user_name?: string | null
          video_id?: string | null
        }
        Update: {
          comment_content?: string | null
          created_at?: string
          id?: number
          like_num?: number | null
          profile_img?: number | null
          user_name?: string | null
          video_id?: string | null
        }
        Relationships: []
      }
      live_chat: {
        Row: {
          created_at: string
          id: number
          live_content: string | null
          meetup_id: number | null
          profile_img: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          live_content?: string | null
          meetup_id?: number | null
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          live_content?: string | null
          meetup_id?: number | null
          profile_img?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'live_chat_meetup_id_fkey'
            columns: ['meetup_id']
            isOneToOne: false
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'live_chat_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      meetup_board: {
        Row: {
          category: string | null
          created_at: string
          id: number
          meetup_content: string | null
          meetup_like_num: number | null
          meetup_title: string | null
          member_count: number | null
          member_list: string[] | null
          scheduling: string | null
          thumbnail: string | null
          user_name: string | null
          video_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          meetup_content?: string | null
          meetup_like_num?: number | null
          meetup_title?: string | null
          member_count?: number | null
          member_list?: string[] | null
          scheduling?: string | null
          thumbnail?: string | null
          user_name?: string | null
          video_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          meetup_content?: string | null
          meetup_like_num?: number | null
          meetup_title?: string | null
          member_count?: number | null
          member_list?: string[] | null
          scheduling?: string | null
          thumbnail?: string | null
          user_name?: string | null
          video_id?: string | null
        }
        Relationships: []
      }
      meetup_comments: {
        Row: {
          comment_content: string | null
          created_at: string
          id: number
          meetup_id: number | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          comment_content?: string | null
          created_at?: string
          id?: number
          meetup_id?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          comment_content?: string | null
          created_at?: string
          id?: number
          meetup_id?: number | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'meetup_comments_meetup_id_fkey'
            columns: ['meetup_id']
            isOneToOne: true
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meetup_comments_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      meetup_like: {
        Row: {
          board_id: number | null
          id: number
          like_num: number | null
          user_id: string | null
        }
        Insert: {
          board_id?: number | null
          id?: number
          like_num?: number | null
          user_id?: string | null
        }
        Update: {
          board_id?: number | null
          id?: number
          like_num?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'meetup_like_board_id_fkey'
            columns: ['board_id']
            isOneToOne: false
            referencedRelation: 'meetup_board'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meetup_like_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      my_page: {
        Row: {
          created_at: string
          favored_meetup: number[] | null
          first_survey_answer: number | null
          id: number
          in_progress_meetup: number[] | null
          introduce: string | null
          profiile_img: number | null
          second_survey_answer: number | null
          third_survey_answer: number | null
          user_id: string
          user_name: string
        }
        Insert: {
          created_at?: string
          favored_meetup?: number[] | null
          first_survey_answer?: number | null
          id?: number
          in_progress_meetup?: number[] | null
          introduce?: string | null
          profiile_img?: number | null
          second_survey_answer?: number | null
          third_survey_answer?: number | null
          user_id: string
          user_name: string
        }
        Update: {
          created_at?: string
          favored_meetup?: number[] | null
          first_survey_answer?: number | null
          id?: number
          in_progress_meetup?: number[] | null
          introduce?: string | null
          profiile_img?: number | null
          second_survey_answer?: number | null
          third_survey_answer?: number | null
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'my_page_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      survey: {
        Row: {
          '✈여행 티켓': number | null
          '🎅아직도 믿음': number | null
          '👔인기브랜드 의류': number | null
          '👦11~20세': number | null
          '👨‍🦰20세 이상': number | null
          '👶0~5세': number | null
          '💔마음에 드는 척 한다.': number | null
          '💣솔직하게 말한다.': number | null
          '💸현금': number | null
          '💻최신 전자제품': number | null
          '🗑몰래 버린다.': number | null
          '🤖포커페이스 한다.': number | null
          '🧑6~10세': number | null
          '🧱당근마켓에 판매한다.': number | null
          '😇받고 싶은 선물이 없다.': number | null
          created_at: string
          id: number
        }
        Insert: {
          '✈여행 티켓'?: number | null
          '🎅아직도 믿음'?: number | null
          '👔인기브랜드 의류'?: number | null
          '👦11~20세'?: number | null
          '👨‍🦰20세 이상'?: number | null
          '👶0~5세'?: number | null
          '💔마음에 드는 척 한다.'?: number | null
          '💣솔직하게 말한다.'?: number | null
          '💸현금'?: number | null
          '💻최신 전자제품'?: number | null
          '🗑몰래 버린다.'?: number | null
          '🤖포커페이스 한다.'?: number | null
          '🧑6~10세'?: number | null
          '🧱당근마켓에 판매한다.'?: number | null
          '😇받고 싶은 선물이 없다.'?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          '✈여행 티켓'?: number | null
          '🎅아직도 믿음'?: number | null
          '👔인기브랜드 의류'?: number | null
          '👦11~20세'?: number | null
          '👨‍🦰20세 이상'?: number | null
          '👶0~5세'?: number | null
          '💔마음에 드는 척 한다.'?: number | null
          '💣솔직하게 말한다.'?: number | null
          '💸현금'?: number | null
          '💻최신 전자제품'?: number | null
          '🗑몰래 버린다.'?: number | null
          '🤖포커페이스 한다.'?: number | null
          '🧑6~10세'?: number | null
          '🧱당근마켓에 판매한다.'?: number | null
          '😇받고 싶은 선물이 없다.'?: number | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      survey2: {
        Row: {
          created_at: string
          first_question: Json
          id: number
          second_question: Json
          third_question: Json
        }
        Insert: {
          created_at?: string
          first_question: Json
          id?: number
          second_question: Json
          third_question: Json
        }
        Update: {
          created_at?: string
          first_question?: Json
          id?: number
          second_question?: Json
          third_question?: Json
        }
        Relationships: []
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
