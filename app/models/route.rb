class Route < ApplicationRecord
validates :title, presence: true
validates :start_long, presence: true
validates :start_lat, presence: true
validates :end_long, presence: true
validates :end_lat, presence: true
# validates :description, presence: true 
# validates :image, presence: true
# validates :distance, presence: true

belongs_to :user,
    foreign_key: :user_id

has_many :workouts,
  foreign_key: :route_id
end



# a ||= b
# def hello(a)
#   a[2] = '*'
# end

# a = ['h','e','l','l','o']
# hello(a)
# puts a.join('')
# Me to Everyone (1:23 PM)
# he*lo
# Yoni to Everyone (1:23 PM)
# def goodbye(a)
#   a = ['g','o','o','d','b','y','e']
# end

# a = ['h','e','l','l','o']
# goodbye(a)
# puts a.join('')


# function matchingBraces(braces) {
#     //Write your code here
#     let answer = [];// yes, no
#     let stack = [];//  
#     let brake = false; // true -> false
#     const brace = {
#         '[': ']',
#         '{': '}',
#         '(': ')'
#     };
#     for(let tix of braces){
#         stack = [];
        
#         for(let char of tix){
#             if(char in brace){
#                 stack.push(brace[char])
#             } else {
#                 if(stack.pop() !== char){
#                     answer.push('NO');
#                     brake = true;
#                     break;
#                 }
#             }
#         }
        
#           if (brake) {
#               brake = false
#               continue
#               }
#             if(stack.length > 0) {
#                 answer.push('NO')
#                 continue;
#                 };
            
#             answer.push('YES');
#         }
        
#     return answer;
# }