#lang racket

(define (first _list )
    (car _list)
)

(define (second _list )
    (car (cdr _list))
)

(define (third _list )
    (car (cdr (cdr _list)))
)
(first '(5 6 7 8))
(second '(5 6 7 8))
(third '(5 6 7 8))

(define )
