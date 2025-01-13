i = 0

module.exports = -> 

    switch i++ % 2

        when 0 then '∑'
        when 1 then -> '∞'
