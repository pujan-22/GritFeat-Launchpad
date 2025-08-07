/*
Check if any item from user roles exists in required roles.

For eg: 
Find if user and editor roles are present in requiredRoles.(roles can be any of length)

const roles = ['admin', ’manager’,  supervisor‘’,  'editor', ‘viewer’, ‘owner’, ‘’]
const userRoles = ['user', 'editor']
const requiredRoles = ['admin',  'editor']

Answer: true
*/
function hasAccess(arr, arr2) {
    const roleSet = new Set(arr2);
    for (const role of arr) {
        if (roleSet.has(role)) {
            return true;
        }
    }
    return false;
}

const roles = ['admin', 'manager', 'supervisor', 'editor', 'viewer', 'owner', ''];
const userRoles = ['user', 'editor'];
const requiredRoles = ['admin', 'editor'];
console.log(hasAccess(roles, requiredRoles));
console.log(hasAccess(userRoles, requiredRoles));

//Time complexity = O(n+m) 